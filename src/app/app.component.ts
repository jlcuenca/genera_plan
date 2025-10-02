import { Component, OnInit } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { CurriculumService, } from './curriculum.service';
import {
  AreaFormacion, Materia, SubArea, PlanDeEstudios, CaracterMateria, OportunidadEvaluacion,
  RelacionDisciplinar, ModalidadAprendizaje, Espacio, AreaFormacionEnum, AmbienteAprendizaje, EstatusMateria,
  getEmptyPlan
} from './curriculum.model';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { HttpClient } from '@angular/common/http';


declare var Chart: any;
declare var jsPDF: any;

// Función para generar un UUID simple y único para la sesión del navegador.
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  planId: string | null = null;
  planDeEstudios: PlanDeEstudios | null = null;
  isLoading = true;
  currentView: 'table' | 'charts' = 'table';
  hoursChart: any;
  creditsChart: any;
  private chartJsScriptLoaded = false;
  private jspdfScriptLoaded = false;
  isMateriaModalOpen = false;
  editingMateria: Partial<Materia> | null = null;
  currentContext: { area: AreaFormacion, subArea?: SubArea } | null = null;
  isNewMateria = false;
  isPlanModalOpen = false;
  editingPlan: Partial<PlanDeEstudios> | null = null;
  optionsOe = Object.values(OportunidadEvaluacion);
  optionsRd = Object.values(RelacionDisciplinar);
  optionsMa = Object.values(ModalidadAprendizaje);
  optionsE = Object.values(Espacio);
  optionsCa = Object.values(CaracterMateria);
  optionsAf = Object.values(AreaFormacionEnum);
  optionsAa = Object.values(AmbienteAprendizaje);
  optionsEstatus = Object.values(EstatusMateria);
  headerDefinitions = {
    ACD: 'Agrupación curricular distintiva de la EE', R: 'Requisitos (Pre-requisitos)', Oe: 'Oportunidades de evaluación (O = Ordinario, T = Todas)', Rd: 'Relación disciplinar (I = Interdisciplinario, M = Multidisciplinario)', Ma: 'Modalidad de aprendizaje (C = Curso, T = Taller, CT = Curso taller, S = Seminario, etc.)', E: 'Espacio (IPA = Intraprograma educativo, IaF = Intrafacultad, etc.)', Ca: 'Carácter (Ob = Obligatoria, Op = Optativa)', HT: 'Número de horas teóricas semanales', HP: 'Número de horas prácticas semanales', HO: 'Número de horas de trabajo autónomo del estudiante', CR: 'Número de créditos (calculado)', AF: 'Área de formación (AFB = Básica, AFD = Disciplinar, etc.)', AA: 'Ambiente de aprendizaje (P = Presencial, V = Virtual, M = Mixto)'
  };

  constructor(
    private curriculumService: CurriculumService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient // Inyectar HttpClient
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      let currentRoute = this.route.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }

      const id = currentRoute.snapshot.paramMap.get('planId');

      if (id) {
        if (this.planId !== id) {
          this.planId = id;
          this.loadData();
        }
      } else {
        console.error("La navegación del router finalizó, pero no se encontró un 'planId' en la ruta activa.");
        this.isLoading = false;
      }
    });
  }

  loadData(): void {
    if (!this.planId) return;
    this.isLoading = true;
    this.curriculumService.getPlanDeEstudios(this.planId).subscribe({
      next: (data) => {
        data.areas.forEach(area => {
            area.materias?.forEach(m => { if (!m._id) m._id = generateUUID(); });
            area.subAreas?.forEach(sa => {
                sa.materias?.forEach(m => { if (!m._id) m._id = generateUUID(); });
            });
        });
        this.planDeEstudios = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        if (err.status === 404) {
          console.log(`El plan '${this.planId}' no existe. Creando una plantilla nueva.`);
          this.planDeEstudios = getEmptyPlan(this.planId!);
        } else {
          console.error("Error al cargar los datos", err);
        }
        this.isLoading = false;
      }
    });
  }

  saveChanges(): void {
    if (this.planDeEstudios && this.planId) {
        this.updatePlanDate();
        this.curriculumService.saveFullCurriculum(this.planId, this.planDeEstudios).subscribe({
          next: (response) => { console.log(`Guardado con éxito: ${response.message}`); },
          error: (err: any) => { console.error('Error al guardar los datos.', err); }
        });
    }
  }

  showTableView(): void { this.currentView = 'table'; }

  async showChartsView(): Promise<void> {
    this.currentView = 'charts';
    try {
        await this.loadChartJsScript();
        setTimeout(() => this.createCharts(), 0);
    } catch (error) { console.error('Fallo al cargar el script de Chart.js', error); }
  }

  private loadChartJsScript(): Promise<void> {
    if (this.chartJsScriptLoaded) { return Promise.resolve(); }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => { this.chartJsScriptLoaded = true; resolve(); };
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
    });
  }
  
  private loadJsPdfScript(): Promise<void> {
    if (this.jspdfScriptLoaded) { return Promise.resolve(); }
    return new Promise((resolve, reject) => {
        const jspdfScript = document.createElement('script');
        jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        jspdfScript.onload = () => {
            const autoTableScript = document.createElement('script');
            autoTableScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js';
            autoTableScript.onload = () => { this.jspdfScriptLoaded = true; resolve(); };
            autoTableScript.onerror = (error) => reject(error);
            document.body.appendChild(autoTableScript);
        };
        jspdfScript.onerror = (error) => reject(error);
        document.body.appendChild(jspdfScript);
    });
  }

  private createCharts(): void {
    if (!this.planDeEstudios) return;
    if (this.hoursChart) this.hoursChart.destroy();
    if (this.creditsChart) this.creditsChart.destroy();
    const areaLabels = this.planDeEstudios.areas.map(area => area.nombre.replace('Área de Formación ', '').replace(' (AFBG)', '').replace(' (AFBID)', ''));
    const chartColors = this.planDeEstudios.areas.map(area => this.getAreaChartColor(area.nombre));
    const htData = this.planDeEstudios.areas.map(area => this.calculateTotal(area, 'ht'));
    const hpData = this.planDeEstudios.areas.map(area => this.calculateTotal(area, 'hp'));
    const hoData = this.planDeEstudios.areas.map(area => this.calculateTotal(area, 'ho'));
    const crData = this.planDeEstudios.areas.map(area => this.calculateTotal(area, 'cr'));
    this.createHoursChart(areaLabels, htData, hpData, hoData);
    this.createCreditsChart(areaLabels, crData, chartColors);
  }

  private getAreaChartColor(areaNombre: string): string {
    if (areaNombre.includes('Básica General')) return '#FF6384';
    if (areaNombre.includes('Iniciación a la Disciplina')) return '#FF9F40';
    if (areaNombre.includes('Disciplinar')) return '#4BC0C0';
    if (areaNombre.includes('Terminal')) return '#36A2EB';
    if (areaNombre.includes('Elección Libre')) return '#FFCD56';
    return '#C9CBCF';
  }

  private createHoursChart(labels: string[], htData: number[], hpData: number[], hoData: number[]): void {
    const canvas = document.getElementById('hoursChart') as HTMLCanvasElement;
    if (!canvas) return;
    this.hoursChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                { label: 'Horas Teóricas (HT)', data: htData, backgroundColor: 'rgba(54, 162, 235, 0.7)' },
                { label: 'Horas Prácticas (HP)', data: hpData, backgroundColor: 'rgba(255, 99, 132, 0.7)' },
                { label: 'Otras Horas (HO)', data: hoData, backgroundColor: 'rgba(255, 206, 86, 0.7)' }
            ]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Dimensionamiento de Horas por Área de Formación', font: { size: 16 } }, tooltip: { mode: 'index', intersect: false } },
            scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
        }
    });
  }

  private createCreditsChart(labels: string[], data: number[], colors: string[]): void {
    const canvas = document.getElementById('creditsChart') as HTMLCanvasElement;
    if (!canvas) return;
    this.creditsChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{ label: 'Créditos', data: data, backgroundColor: colors, hoverOffset: 4 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Dimensionamiento de Créditos por Área de Formación', font: { size: 16 } }, legend: { position: 'top' } }
        }
    });
  }
  
  getAreaClass(areaNombre: string): string {
    if (areaNombre.includes('Básica General')) return 'area-style-afbg';
    if (areaNombre.includes('Iniciación a la Disciplina')) return 'area-style-afbid';
    if (areaNombre.includes('Disciplinar')) return 'area-style-afd';
    if (areaNombre.includes('Terminal')) return 'area-style-aft';
    if (areaNombre.includes('Elección Libre')) return 'area-style-afel';
    return '';
  }

  calculateTotal(area: AreaFormacion, key: 'ht' | 'hp' | 'ho' | 'cr'): number {
    const directTotal = area.materias?.reduce((sum, m) => sum + (m[key] || 0), 0) || 0;
    const subAreaTotal = area.subAreas?.reduce((sum, sa) => sum + (sa.materias?.reduce((subSum, m) => subSum + (m[key] || 0), 0) || 0), 0) || 0;
    return directTotal + subAreaTotal;
  }
  
  openPlanModal(): void { if (this.planDeEstudios) { this.editingPlan = { ...this.planDeEstudios }; this.isPlanModalOpen = true; } }
  closePlanModal(): void { this.isPlanModalOpen = false; this.editingPlan = null; }

  private updatePlanDate(): void {
      if (this.planDeEstudios) {
          const today = new Date();
          const year = today.getFullYear();
          const month = ('0' + (today.getMonth() + 1)).slice(-2);
          const day = ('0' + today.getDate()).slice(-2);
          this.planDeEstudios.fechaElaboracion = `${year}-${month}-${day}`;
      }
  }

  savePlan(): void {
    if (this.editingPlan && this.planDeEstudios) {
      Object.assign(this.planDeEstudios, this.editingPlan); 
      this.closePlanModal();
      this.saveChanges();
    }
  }
  
  openEditModal(materia: Materia, area: AreaFormacion, subArea?: SubArea): void {
    this.isNewMateria = false;
    this.editingMateria = { ...materia };
    this.currentContext = { area, subArea };
    this.isMateriaModalOpen = true;
  }

  openNewModal(area: AreaFormacion, subArea?: SubArea): void {
    this.isNewMateria = true;
    this.editingMateria = {
        _id: generateUUID(), // Generar ID único para la nueva materia
        clave: '', nombre: '', seriacion: null, acd: '', caracter: CaracterMateria.Obligatoria,
        ht: 0, hp: 0, ho: 0, cr: 0, oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario,
        ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: area.nombre.includes('Básica') ? AreaFormacionEnum.Basica : AreaFormacionEnum.Disciplinar,
        aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        justificacion: 'Ejemplo de justificación...',
        unidadCompetencia: 'Ejemplo de unidad de competencia...',
        saberesHeuristicos: 'Ejemplo de saberes heurísticos...',
        saberesTeoricos: 'Ejemplo de saberes teóricos...',
        saberesAxiologicos: 'Ejemplo de saberes axiológicos...',
        // Nuevos campos con valores de ejemplo
        estrategiasGenerales: 'Ejemplo de estrategias generales de enseñanza-aprendizaje...',
        apoyosEducativos: 'Proyector, software especializado, etc.',
        evaluacionProductos: [{ evidencia: 'Examen Parcial', indicadores: 'Comprensión de temas', procedimiento: 'Prueba escrita', porcentaje: 30 }],
        acreditacion: { ordinario: 'Calificación final >= 6', extraordinario: 'Examen final', suficiencia: 'Examen de suficiencia' },
        perfilDocente: 'Licenciatura en el área, preferiblemente con posgrado...',
        fuentesInformacion: ['Libro de Texto Principal, 2024', 'Artículo de Referencia, 2023'],
        formalizacion: { fechaElaboracion: new Date().toISOString().split('T')[0], fechaModificacion: new Date().toISOString().split('T')[0], cuerpoColegiado: 'Academia de Métodos Cuantitativos' },
        academicosElaboraron: ['Dr. Juan Pérez', 'Mtra. Ana García']
    };
    this.calculateCredits();
    this.currentContext = { area, subArea };
    this.isMateriaModalOpen = true;
  }

  closeMateriaModal(): void { this.isMateriaModalOpen = false; this.editingMateria = null; this.currentContext = null; }

  // Métodos para manejar arreglos en el modal
  addProducto(): void {
    if (this.editingMateria && this.editingMateria.evaluacionProductos) {
      this.editingMateria.evaluacionProductos.push({ evidencia: '', indicadores: '', procedimiento: '', porcentaje: 0 });
    }
  }
  removeProducto(index: number): void {
    this.editingMateria?.evaluacionProductos?.splice(index, 1);
  }

  addFuente(): void {
    this.editingMateria?.fuentesInformacion?.push('');
  }
  removeFuente(index: number): void {
    this.editingMateria?.fuentesInformacion?.splice(index, 1);
  }

  addAcademico(): void {
    this.editingMateria?.academicosElaboraron?.push('');
  }
  removeAcademico(index: number): void {
    this.editingMateria?.academicosElaboraron?.splice(index, 1);
  }

  saveMateria(): void {
    if (!this.editingMateria || !this.currentContext || !this.planDeEstudios) return;

    if (this.isNewMateria) {
      const targetArea = this.planDeEstudios.areas.find(a => a.nombre === this.currentContext!.area.nombre);
      if (targetArea) {
        if (this.currentContext.subArea) {
          const targetSubArea = targetArea.subAreas?.find(sa => sa.nombre === this.currentContext!.subArea!.nombre);
          if (targetSubArea) {
            if (!targetSubArea.materias) targetSubArea.materias = [];
            targetSubArea.materias.push(this.editingMateria as Materia);
          }
        } else {
          if (!targetArea.materias) targetArea.materias = [];
          targetArea.materias.push(this.editingMateria as Materia);
        }
      }
    } else {
      let found = false;
      for (const area of this.planDeEstudios.areas) {
        const materiaIndex = area.materias.findIndex(m => m._id === this.editingMateria!._id);
        if (materiaIndex !== -1) {
          area.materias[materiaIndex] = { ...area.materias[materiaIndex], ...this.editingMateria };
          found = true; break;
        }
        if (area.subAreas) {
          for (const subArea of area.subAreas) {
            const subMateriaIndex = subArea.materias.findIndex(m => m._id === this.editingMateria!._id);
            if (subMateriaIndex !== -1) {
              subArea.materias[subMateriaIndex] = { ...subArea.materias[subMateriaIndex], ...this.editingMateria };
              found = true; break;
            }
          }
        }
        if (found) break;
      }
    }
    this.closeMateriaModal();
    this.saveChanges();
  }

  deleteMateria(materiaToDelete: Materia): void {
    if (!this.planDeEstudios) return;
    if (confirm(`¿Estás seguro de que quieres eliminar la materia "${materiaToDelete.nombre}"?`)) {
        let found = false;
        for (const area of this.planDeEstudios.areas) {
            let materiaIndex = area.materias.findIndex(m => m._id === materiaToDelete._id);
            if (materiaIndex !== -1) {
                area.materias.splice(materiaIndex, 1);
                found = true; break;
            }
            if (area.subAreas) {
                for (const subArea of area.subAreas) {
                    let subMateriaIndex = subArea.materias.findIndex(m => m._id === materiaToDelete._id);
                    if (subMateriaIndex !== -1) {
                        subArea.materias.splice(subMateriaIndex, 1);
                        found = true; break;
                    }
                }
            }
            if (found) break;
        }
        if (found) {
            this.saveChanges();
        }
    }
  }

  duplicateMateria(materiaToDuplicate: Materia, area: AreaFormacion, subArea?: SubArea): void {
    if (!this.planDeEstudios) return;
    const newKey = `${materiaToDuplicate.clave}_copia`;
    if (confirm(`¿Duplicar la materia "${materiaToDuplicate.nombre}"?\nEl nuevo código será: ${newKey}`)) {
        const newMateria: Materia = {
           ...materiaToDuplicate,
            _id: generateUUID(),
            clave: newKey,
            nombre: `${materiaToDuplicate.nombre} (Copia)`
        };
        const targetArea = this.planDeEstudios.areas.find(a => a.nombre === area.nombre);
        if (targetArea) {
            if (subArea) {
                const targetSubArea = targetArea.subAreas?.find(sa => sa.nombre === subArea.nombre);
                if (targetSubArea) {
                    if (!targetSubArea.materias) targetSubArea.materias = [];
                    targetSubArea.materias.push(newMateria);
                }
            } else {
                if (!targetArea.materias) targetArea.materias = [];
                targetArea.materias.push(newMateria);
            }
            this.saveChanges();
        }
    }
  }

  calculateCredits(): void {
    if (this.editingMateria) {
      const ht = this.editingMateria.ht || 0;
      const hp = this.editingMateria.hp || 0;
      const ho = this.editingMateria.ho || 0;
      this.editingMateria.cr = Math.round((ht * 1) + (hp * 1));
    }
  }
  
  originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => 0;

  async exportToPdf(): Promise<void> {
    if (!this.planDeEstudios) return;
    await this.loadJsPdfScript();
    const { jsPDF } = (window as any).jspdf;
    const doc = new jsPDF({ orientation: 'portrait' });
    doc.setFontSize(16);
    doc.text("Plan de Estudios", 105, 22, { align: 'center' });
    doc.setFontSize(5);
    let yPos = 35;
    const addLine = (label: string, value: string | number | undefined) => {
        doc.setFont(undefined, 'bold');
        doc.text(label, 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(String(value || '-'), 70, yPos);
        yPos += 4;
    };
    addLine("Opción Profesional:", this.planDeEstudios.opcionProfesional);
    addLine("Nivel de Estudios:", this.planDeEstudios.nivelEstudios);
    addLine("Título que se Otorga:", this.planDeEstudios.tituloOtorga);
    addLine("Año del Plan de Estudios:", this.planDeEstudios.periodo);
    addLine("Área Académica:", this.planDeEstudios.areaAcademica);
    addLine("Región en que se Imparte:", this.planDeEstudios.regionImparte);
    addLine("Sede en que se Imparte:", this.planDeEstudios.sedeImparte);
    addLine("Sistema:", this.planDeEstudios.sistema);
    addLine("Modalidad Educativa:", this.planDeEstudios.modalidadEducativa);
    addLine("Estatus:", this.planDeEstudios.estatus);
    addLine("Total de Créditos del Plan de estudios:", this.planDeEstudios.totalCreditosPlan);
    addLine("Total de créditos para obtener el grado:", this.planDeEstudios.totalCreditosGrado);
    addLine("Última Elaboración:", this.planDeEstudios.fechaElaboracion);
    const head = [['ACD', 'Clave', 'Experiencia Educativa', 'R', 'Oe', 'Rd', 'Ma', 'E', 'Ca', 'HT', 'HP', 'HO', 'CR', 'AF', 'AA']];
    const body: any[] = [];
    let grandTotalHT = 0, grandTotalHP = 0, grandTotalHO = 0, grandTotalCR = 0;
    this.planDeEstudios.areas.forEach(area => {
        body.push([{ content: area.nombre, colSpan: 15, styles: { fontStyle: 'bold', fillColor: this.getAreaPdfColor(area.nombre) } }]);
        area.materias.forEach(m => body.push([m.acd, m.clave, m.nombre, m.seriacion || '-', m.oe || '-', m.rd || '-', m.ma || '-', m.e || '-', m.ca || '-', m.ht, m.hp, m.ho, m.cr, m.af || '-', m.aa || '-']));
        area.subAreas?.forEach(sa => {
             body.push([{ content: sa.nombre, colSpan: 15, styles: { fontStyle: 'italic', fillColor: '#f0f0f0' } }]);
             sa.materias.forEach(m => body.push([m.acd, m.clave, m.nombre, m.seriacion || '-', m.oe || '-', m.rd || '-', m.ma || '-', m.e || '-', m.ca || '-', m.ht, m.hp, m.ho, m.cr, m.af || '-', m.aa || '-']));
        });
        const subTotalHT = this.calculateTotal(area, 'ht');
        const subTotalHP = this.calculateTotal(area, 'hp');
        const subTotalHO = this.calculateTotal(area, 'ho');
        const subTotalCR = this.calculateTotal(area, 'cr');
        grandTotalHT += subTotalHT;
        grandTotalHP += subTotalHP;
        grandTotalHO += subTotalHO;
        grandTotalCR += subTotalCR;
        body.push([{ content: `Subtotal ${area.nombre}`, colSpan: 9, styles: { halign: 'right', fontStyle: 'bold' } }, subTotalHT, subTotalHP, subTotalHO, subTotalCR, '', '']);
    });
    body.push([{ content: 'Gran Total', colSpan: 9, styles: { halign: 'right', fontStyle: 'bold', fillColor: '#383838', textColor: '#ffffff' } }, grandTotalHT, grandTotalHP, grandTotalHO, grandTotalCR, '', '']);
    (doc as any).autoTable({
        head: head,
        body: body,
        startY: yPos + 5,
        theme: 'grid',
        headStyles: { fillColor: [56, 56, 56] },
        styles: { fontSize: 5, cellPadding: 1 },
        columnStyles: { 2: { cellWidth: 40 }, },
        didDrawPage: (data: any) => {
            if (data.pageNumber > 1) {
                (doc as any).autoTable({
                    head: head,
                    startY: 10,
                    theme: 'grid',
                    headStyles: { fillColor: [56, 56, 56] },
                    styles: { fontSize: 5, cellPadding: 1 },
                    columnStyles: { 2: { cellWidth: 40 }, }
                });
            }
            const now = new Date();
            const footerText = `Generado el: ${now.toLocaleDateString('es-MX')} ${now.toLocaleTimeString('es-MX')}`;
            doc.setFontSize(4);
            doc.setTextColor(100);
            doc.text(footerText, data.settings.margin.left, doc.internal.pageSize.height - 5);
        }
    });
    doc.save(`Plan_de_Estudios_${this.planDeEstudios.nombre.replace(/ /g, '_')}.pdf`);
  }

  getAreaPdfColor(areaNombre: string): string {
    if (areaNombre.includes('Básica General')) return '#FFEFE5';
    if (areaNombre.includes('Iniciación a la Disciplina')) return '#FFF7F2';
    if (areaNombre.includes('Disciplinar')) return '#E6F4EA';
    if (areaNombre.includes('Terminal')) return '#EBF5FF';
    if (areaNombre.includes('Elección Libre')) return '#FFFBE6';
    return '#f8f9fa';
  }

  async generateDocForMateria(materia: Materia): Promise<void> {
    console.log("Iniciando generación de documento para:", materia.nombre);
    
    try {
      const templateUrl = 'assets/templates/_EE.docx';
      console.log(`Cargando plantilla desde: ${templateUrl}`);
      
      const templateContent = await firstValueFrom(
        this.http.get(templateUrl, { responseType: 'arraybuffer' })
      );

      console.log("Plantilla cargada exitosamente. Procesando...");
      
      // CAMBIO: Se corrige la forma de instanciar Docxtemplater
      const zip = new PizZip(templateContent);
      const doc = new Docxtemplater()
        .loadZip(zip)
        .setOptions({ paragraphLoop: true, linebreaks: true });

      const dataForTemplate = {
        area_academica: this.planDeEstudios?.areaAcademica || 'N/A',
        programa_educativo: this.planDeEstudios?.nombre || 'N/A',
        clave: materia.clave,
        nombre_ee: materia.nombre,
        area_formacion: materia.af || 'N/A',
        caracter: materia.ca || 'N/A',
        ht: materia.ht,
        hp: materia.hp,
        ho: materia.ho,
        total_horas: (materia.ht || 0) + (materia.hp || 0),
        creditos: materia.cr,
        prerrequisitos: materia.seriacion || 'Ninguno',
        justificacion: materia.justificacion || '',
        unidad_competencia: materia.unidadCompetencia || '',
        saberes_heuristicos: materia.saberesHeuristicos || '',
        saberes_teoricos: materia.saberesTeoricos || '',
        saberes_axiologicos: materia.saberesAxiologicos || ''
      };

      doc.setData(dataForTemplate);
      doc.render();

      const out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      saveAs(out, `PEE_${materia.clave}_${materia.nombre}.docx`);
      console.log("Documento generado y descargado exitosamente.");

    } catch (error) {
      console.error("Error durante la generación del documento:", error);
      alert("No se pudo generar el documento. Revisa la consola (F12) para más detalles. El error más común es que la plantilla no se encuentre en 'assets/templates/_EE.docx' o esté corrupta.");
    }
  }

  generateAllDocs(): void {
    if (confirm("Se generará un archivo .docx para cada experiencia educativa del plan de estudios. ¿Deseas continuar?")) {
        this.planDeEstudios?.areas.forEach(area => {
            area.materias?.forEach(materia => this.generateDocForMateria(materia));
            area.subAreas?.forEach(subArea => {
                subArea.materias?.forEach(materia => this.generateDocForMateria(materia));
            });
        });
    }
  }
}
