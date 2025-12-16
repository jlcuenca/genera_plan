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
  _id?: string;
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
  semestre?: number;
  subArea?: { id?: string; nombre: string };
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
}

/**
 * Función que devuelve una plantilla de plan de estudios vacía.
 * Ideal para cuando se crea un nuevo plan desde cero.
 * @param planId El ID que se usará para el nuevo plan.
 */
export function getEmptyPlan(planId: string): PlanDeEstudios {
  return {
    _id: planId,
    nombre: 'Licenciatura en Historia',
    facultad: "Historia",
    opcionProfesional: "",
    nivelEstudios: "Licenciatura",
    tituloOtorga: "Licenciado(a) en Historia",
    periodo: "2024",
    areaAcademica: "Humanidades",
    regionImparte: "Xalapa",
    sedeImparte: "Xalapa",
    sistema: "Escolarizada",
    totalCreditosPlan: 501,
    totalCreditosGrado: 383,
    modalidadEducativa: "Escolarizada",
    estatus: "Pendiente",
    fechaElaboracion: new Date().toISOString().split('T')[0],
    areas: [
      { 
        nombre: 'Área de Formación Básica General (AFBG)', 
        materias: [
          {
        _id: 'ropocq70', clave: '', nombre: "Pensamiento crítico para la solución de problemas", seriacion: null, acd: "",
        caracter: CaracterMateria.Obligatoria, ht: 0, hp: 0, ho: 4, cr: 4,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBG', nombre: 'Formación Básica General' }
    },
          {
        _id: 'j3gcfiky', clave: '', nombre: "Lengua I", seriacion: null, acd: "",
        caracter: CaracterMateria.Obligatoria, ht: 0, hp: 0, ho: 6, cr: 4,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBG', nombre: 'Formación Básica General' }
    },
          {
        _id: 'vaoufru8', clave: '', nombre: "Lengua II", seriacion: null, acd: "Lengua I",
        caracter: CaracterMateria.Obligatoria, ht: 0, hp: 0, ho: 6, cr: 4,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBG', nombre: 'Formación Básica General' }
    },
          {
        _id: 'xk6g68r9', clave: '', nombre: "Lectura y escritura de textos académicos", seriacion: null, acd: "",
        caracter: CaracterMateria.Obligatoria, ht: 0, hp: 0, ho: 4, cr: 4,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBG', nombre: 'Formación Básica General' }
    }
        ],
        subAreas: [] 
      },
      { 
        nombre: 'Área de Formación Básica de Iniciación a la Disciplina (AFBID)', 
        materias: [
          {
        _id: '5mtkhlbh', clave: '', nombre: "0 26 20 BG Área de Formación Básica de Iniciación a la Disciplina (AFBID) Histórica Introducción a la historia crítica", seriacion: "0", acd: "Total de horas y créditos del Área de Formación Básica General (AFBG)",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: 'jzg73hwh', clave: '', nombre: "Ciencias del sistema Tierra", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: 'mzhzzfx7', clave: '', nombre: "Redacción de textos históricos", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: 'c7915u3w', clave: '', nombre: "Geografía histórica", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: 'sd5t3v7u', clave: '', nombre: "Historia cultural", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: '9ptwbsup', clave: '', nombre: "Historia económica", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: 'eapyd444', clave: '', nombre: "Historia política", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: 'f59b2tqq', clave: '', nombre: "Historia social", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    },
          {
        _id: 'afrqxeqq', clave: '', nombre: "Humanidades digitales", seriacion: null, acd: "Tecnologías aplicadas a la Historia",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Basica, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFBID', nombre: 'Iniciación a la Disciplina' }
    }
        ],
        subAreas: [] 
      },
      { 
        nombre: 'Área de Formación Disciplinar (AFD)', 
        materias: [
          {
        _id: '7ndcqi47', clave: '', nombre: "Historia global II", seriacion: "Historia global I", acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'bavze7l3', clave: '', nombre: "Análisis y debates historiográficos", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Seminario, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'vsfyd9e5', clave: '', nombre: "Análisis y debates historiográficos de México", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Seminario, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'cnlac20g', clave: '', nombre: "Civilizaciones y culturas prehispánicas", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'nlri59he', clave: '', nombre: "Historia demográfica", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 's7eqw90z', clave: '', nombre: "Aprendizajes y didáctica de la historia", seriacion: null, acd: "Mediación educativa",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: '1zh4cqp8', clave: '', nombre: "Historia de las culturas en México", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'cqru4ggd', clave: '', nombre: "Construcción y desarrollo del espacio novohispano", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'sbp28px8', clave: '', nombre: "Conformación del Estado nacional", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'hf4nvh5y', clave: '', nombre: "Consolidación del Estado nacional", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'rftcltvd', clave: '', nombre: "Crisis del Estado y transición política", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'rj2hkiwc', clave: '', nombre: "Historia y teoría social", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'syavbm71', clave: '', nombre: "Historia de las Américas I", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'rxyplpnp', clave: '', nombre: "Historia de las Américas II", seriacion: "Historia de América I", acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: '0so247m4', clave: '', nombre: "La región en la Historia I", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'pr2t0yyp', clave: '', nombre: "La región en la Historia II", seriacion: "La región en la Historia I", acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'fuu7d2yc', clave: '', nombre: "Historia oral", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'vegnuk7i', clave: '', nombre: "Investigación histórica I: métodos, herramientas y tendencias", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 1, ho: 0, cr: 9,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Curso, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'aotivou4', clave: '', nombre: "Investigación histórica II: análisis de fuentes", seriacion: "Investigación histórica I: métodos, herramientas y tendencias", acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 2, hp: 3, ho: 0, cr: 7,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'tibe2iuf', clave: '', nombre: "Trabajo de investigación I", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'qvlezkrt', clave: '', nombre: "Trabajo de investigación II", seriacion: "Trabajo de investigación I", acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'arv5s46t', clave: '', nombre: "Historia ambiental", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Optativa, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'cqdlyfim', clave: '', nombre: "Historia de las ciencias y las tecnologías", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Optativa, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'nvcd2r1e', clave: '', nombre: "Historia de la educación", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Optativa, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'g5pum5e1', clave: '', nombre: "Historia de las instituciones públicas y los Derechos Humanos", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Optativa, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'i0yrvsv0', clave: '', nombre: "Historia del arte en México", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Optativa, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    },
          {
        _id: 'u0xe1wxh', clave: '', nombre: "Historia del arte universal", seriacion: null, acd: "Interdisciplinaria",
        caracter: CaracterMateria.Optativa, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Todas, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Disciplinar, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFD', nombre: 'Disciplinar' }
    }
        ],
        subAreas: [] 
      },
      { 
        nombre: 'Área de Formación Terminal (AFT)', 
        materias: [
          {
        _id: 'khjyno5d', clave: '', nombre: "40 0 240 AFD Área de Formación Terminal (AFT) Divulgación y difusión histórica Servicio Social", seriacion: "100", acd: "Total de horas y créditos del Área de Formación Disciplinar (AFD)",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 4, ho: 0, cr: 12,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Seminario, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'ek4hk0ap', clave: '', nombre: "Experiencia Recepcional", seriacion: "Generación del conocimiento histórico", acd: "P",
        caracter: CaracterMateria.Obligatoria, ht: 4, hp: 4, ho: 0, cr: 12,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '0szg5osq', clave: '', nombre: "Planeación educativa y práctica docente", seriacion: "Mediación pedagógica", acd: "P",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'oczx3e5u', clave: '', nombre: "Rescate, conservación y administración de archivos", seriacion: null, acd: "Divulgación y difusión histórica",
        caracter: CaracterMateria.Obligatoria, ht: 3, hp: 2, ho: 0, cr: 8,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.CursoTaller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '7nccef9d', clave: '', nombre: "Análisis de imágenes", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Obligatoria, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'eh5hkxn6', clave: '', nombre: "Diseño de proyectos culturales y ecoculturales", seriacion: null, acd: "Divulgación y difusión histórica",
        caracter: CaracterMateria.Obligatoria, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Obligatoria,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'eugs374o', clave: '', nombre: "Divulgación de la historia", seriacion: null, acd: "Divulgación y difusión histórica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '0qgkhhkt', clave: '', nombre: "Taller de gestión", seriacion: null, acd: "Divulgación y difusión histórica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'sp7k74my', clave: '', nombre: "Taller de biblioteconomía", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'o9y8k3oo', clave: '', nombre: "Restauración de documentos", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '37kx1glq', clave: '', nombre: "Paleografía", seriacion: null, acd: "Generación del conocimiento histórico",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Interdisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '6rphjjo1', clave: '', nombre: "Memorias colectivas", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 's3py1bpk', clave: '', nombre: "Historia de las mujeres y del género", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'yfw9e6cl', clave: '', nombre: "Tópicos contemporáneos de historia", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '0oudyitk', clave: '', nombre: "Análisis del paisaje y el espacio", seriacion: null, acd: "Histórica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'g9zengkw', clave: '', nombre: "Ambientes de aprendizaje", seriacion: null, acd: "Mediación pedagógica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '0t33t0ks', clave: '', nombre: "Recursos para la socialización de la historia", seriacion: null, acd: "Mediación pedagógica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'jjlmo5jn', clave: '', nombre: "Taller de mediación pedagógica", seriacion: null, acd: "Mediación pedagógica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: '1vg1osxx', clave: '', nombre: "Bases de datos y ficheros digitales.", seriacion: "das a la historia", acd: "Tecnologías aplica",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'eha3joc9', clave: '', nombre: "Medios digitales y de comunicación", seriacion: null, acd: "Tecnologías aplicadas a la historia",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    },
          {
        _id: 'wdu51qi9', clave: '', nombre: "Diseño y elaboración de recursos para la enseñanza de la historia.", seriacion: null, acd: "Tecnologías aplicadas a la historia",
        caracter: CaracterMateria.Optativa, ht: 1, hp: 4, ho: 0, cr: 6,
        oe: OportunidadEvaluacion.Ordinario, rd: RelacionDisciplinar.Multidisciplinario, ma: ModalidadAprendizaje.Taller, e: Espacio.Intraprograma, ca: CaracterMateria.Optativa,
        af: AreaFormacionEnum.Terminal, aa: AmbienteAprendizaje.Presencial, estatus: EstatusMateria.Pendiente,
        semestre: 1, subArea: { id: 'AFT', nombre: 'Terminal' }
    }
        ],
        subAreas: [] 
      },
      { 
        nombre: 'Área de Formación de Elección Libre (AFEL)', 
        materias: [],
        subAreas: [] 
      }
    ]
  };
}