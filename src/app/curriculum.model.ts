// ===== 1. curriculum.model.ts (Modelos de Datos con Plantilla Vacía) =====

export enum OportunidadEvaluacion {
  Ordinario = 'O',
  Todas = 'T'
}

export enum RelacionDisciplinar {
  Interdisciplinario = 'I',
  Multidisciplinario = 'M'
}

export enum ModalidadAprendizaje {
  Curso = 'C',
  Taller = 'T',
  CursoTaller = 'CT',
  Seminario = 'S',
  Practica = 'P',
  PracticaProfesional = 'PP',
  EstanciaAcademica = 'EA',
  Vinculacion = 'VC',
  Investigacion = 'I',
  Autoaprendizaje = 'AB',
  Laboratorio = 'L',
  Otras = 'otras'
}

export enum Espacio {
  Intraprograma = 'IPA',
  Intrafacultad = 'IaF',
  Interfacultad = 'IeF',
  Internacional = 'IN',
  Interinstitucional = 'IE',
  Empresa = 'Em',
  Escuela = 'Es',
  OrganismoGubernamental = 'OG',
  OrganismoNoGubernamental = 'ONG',
  Mixto = 'M',
  Otros = 'otros'
}

export enum CaracterMateria {
  Obligatoria = 'Ob',
  Optativa = 'Op'
}

export enum AreaFormacionEnum {
  Basica = 'AFB',
  BasicaGeneral = 'AFBG',
  IniciacionDisciplina = 'AFBID',
  Disciplinar = 'AFD',
  Terminal = 'AFT',
  EleccionLibre = 'AFEL'
}

export enum AmbienteAprendizaje {
  Presencial = 'P',
  Virtual = 'V',
  Mixto = 'M'
}

export enum EstatusMateria {
    Pendiente = 'P',
    FinalizadoBorrador = 'F',
    FinalizadoDictaminado = 'FD',
    FinalizadoInstitucional = 'FI',
    FinalizadoTecnico = 'FT',
    AFEL = 'AFEL'
}

export interface PlanDeEstudios {
  nombre: string;
  fechaElaboracion: string;
  periodo: string;
  areas: AreaFormacion[];
  facultad: string;

  // Nuevos campos
  opcionProfesional: string;
  nivelEstudios: string;
  tituloOtorga: string;
  areaAcademica: string;
  regionImparte: string;
  sedeImparte: string;
  sistema: string;
  totalCreditosPlan: number;
  totalCreditosGrado: number;
  modalidadEducativa: string;
  estatus: 'Aprobado' | 'Pendiente';
}

export interface Materia {
  _id?: string;
  clave: string;
  nombre:string;
  seriacion: string | null;
  acd: string;
  caracter: CaracterMateria;
  ht: number;
  hp: number;
  ho: number;
  cr: number;
  oe: OportunidadEvaluacion | null;
  rd: RelacionDisciplinar | null;
  ma: ModalidadAprendizaje | null;
  e: Espacio | null;
  ca: CaracterMateria | null;
  af: AreaFormacionEnum | null;
  aa: AmbienteAprendizaje | null;
  estatus?: EstatusMateria;
  justificacion?: string;
  unidadCompetencia?: string;
  saberesHeuristicos?: string;
  saberesTeoricos?: string;
  saberesAxiologicos?: string;

  // Campos del 20 al 27 (Formalización y académicos)
  estrategiasGenerales?: string;
  apoyosEducativos?: string;
  evaluacionProductos?: EvaluacionProducto[];
  acreditacion?: Acreditacion;
  perfilDocente?: string;
  fuentesInformacion?: string[];
  formalizacion?: Formalizacion;
  academicosElaboraron?: string[];
}

export interface EvaluacionProducto {
  evidencia: string;
  indicadores: string;
  procedimiento: string;
  porcentaje: number;
}

export interface Acreditacion {
  ordinario: string;
  extraordinario: string;
  suficiencia: string;
}

export interface AreaFormacion {
  nombre: string;
  materias: Materia[];
  totalHT?: number;
  totalHP?: number;
  totalHO?: number;
  totalCreditos?: number;
  subAreas?: SubArea[];
}

export interface SubArea {
  nombre: string;
  materias: Materia[];
}

export interface Formalizacion {
  fechaElaboracion: string;
  fechaModificacion: string;
  cuerpoColegiado: string;
  materias: Materia[];
}

/**
 * Función que devuelve una plantilla de plan de estudios vacía.
 * Ideal para cuando se crea un nuevo plan desde cero.
 * @param planId El ID que se usará para el nuevo plan.
 */
export function getEmptyPlan(planId: string): PlanDeEstudios {
  return {
    nombre: `Nuevo Plan de Estudios (${planId})`,
    facultad: "",
    opcionProfesional: "",
    nivelEstudios: "Licenciatura",
    tituloOtorga: "",
    periodo: new Date().getFullYear().toString(),
    areaAcademica: "",
    regionImparte: "",
    sedeImparte: "",
    sistema: "Escolarizada",
    totalCreditosPlan: 0,
    totalCreditosGrado: 0,
    modalidadEducativa: "Escolarizada",
    estatus: "Pendiente",
    fechaElaboracion: new Date().toISOString().split('T')[0],
    areas: [
      { nombre: 'Área de Formación Básica General (AFBG)', materias: [], subAreas: [] },
      { nombre: 'Área de Formación Básica de Iniciación a la Disciplina (AFBID)', materias: [], subAreas: [] },
      { nombre: 'Área de Formación Disciplinar (AFD)', materias: [], subAreas: [] },
      { nombre: 'Área de Formación Terminal (AFT)', materias: [], subAreas: [] },
      { nombre: 'Área de Formación de Elección Libre (AFEL)', materias: [], subAreas: [] }
    ]
  };
}
