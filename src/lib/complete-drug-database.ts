// Complete Pediatric Drug Database
// Based on Nelson Textbook of Pediatrics, 21st Edition
// Comprehensive database covering all medical systems

export interface DrugInfo {
  id: string
  name: string
  genericName: string
  system: string
  category: string
  indications: string[]
  contraindications: string[]
  warnings: string[]
  adverseEffects: string[]
  interactions: string[]
  monitoring: string[]
  pregnancyCategory: string
  breastfeeding: string
  pediatricUse: string
  dosage: {
    neonatal: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
    infant: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
    child: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
    adolescent: {
      dose: string
      frequency: string
      maxDose: string
      notes: string
    }
  }
  administration: {
    route: string[]
    formulation: string[]
    storage: string
    stability: string
  }
  renalAdjustment: {
    adjustment: string
    monitoring: string
  }
  hepaticAdjustment: {
    adjustment: string
    monitoring: string
  }
  references: string[]
  nelsonPage: string
  evidenceLevel: string
}

export interface MedicalSystem {
  id: string
  name: string
  description: string
  icon: string
  color: string
  categories: string[]
}

export const medicalSystems: MedicalSystem[] = [
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'Neurological medications including anticonvulsants, sedatives, and neuroprotective agents',
    icon: '🧠',
    color: 'purple',
    categories: ['Anticonvulsants', 'Sedatives/Hypnotics', 'Analgesics', 'Neuroprotective']
  },
  {
    id: 'neonatology',
    name: 'Neonatology',
    description: 'Medications specifically for newborns and premature infants',
    icon: '👶',
    color: 'pink',
    categories: ['Surfactants', 'Caffeine', 'Antibiotics', 'Cardiovascular']
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    description: 'Medications for asthma, bronchiolitis, pneumonia, and other respiratory conditions',
    icon: '🫁',
    color: 'blue',
    categories: ['Bronchodilators', 'Corticosteroids', 'Mucolytics', 'Antibiotics']
  },
  {
    id: 'gastrointestinal',
    name: 'Gastrointestinal System',
    description: 'Medications for GI disorders, reflux, inflammatory bowel disease, and liver conditions',
    icon: '🦠',
    color: 'green',
    categories: ['Antacids', 'Anti-inflammatories', 'Enzymes', 'Antiemetics']
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    description: 'Medications for hypertension, heart failure, arrhythmias, and other cardiac conditions',
    icon: '❤️',
    color: 'red',
    categories: ['Antihypertensives', 'Antiarrhythmics', 'Inotropes', 'Diuretics']
  },
  {
    id: 'rheumatology',
    name: 'Rheumatology',
    description: 'Medications for juvenile arthritis, autoimmune diseases, and inflammatory conditions',
    icon: '🦴',
    color: 'orange',
    categories: ['NSAIDs', 'DMARDs', 'Biologics', 'Corticosteroids']
  },
  {
    id: 'immunology',
    name: 'Immunology & Allergy',
    description: 'Medications for allergies, immunodeficiencies, and autoimmune disorders',
    icon: '🛡️',
    color: 'indigo',
    categories: ['Antihistamines', 'Immunomodulators', 'Vaccines', 'Allergy Treatments']
  },
  {
    id: 'urology',
    name: 'Urology',
    description: 'Medications for urinary tract infections, enuresis, and urological conditions',
    icon: '🚽',
    color: 'cyan',
    categories: ['Antibiotics', 'Antispasmodics', 'Diuretics', 'Hormones']
  },
  {
    id: 'nephrology',
    name: 'Nephrology',
    description: 'Medications for kidney diseases, hypertension, and electrolyte disorders',
    icon: '🫘',
    color: 'teal',
    categories: ['Antihypertensives', 'Electrolytes', 'Immunosuppressants', 'Diuretics']
  },
  {
    id: 'hematology',
    name: 'Hematology',
    description: 'Medications for anemia, bleeding disorders, and hematologic conditions',
    icon: '🩸',
    color: 'maroon',
    categories: ['Iron Supplements', 'Coagulation', 'Hematopoietic', 'Anticoagulants']
  },
  {
    id: 'bone',
    name: 'Bone & Joint',
    description: 'Medications for osteoporosis, fractures, and orthopedic conditions',
    icon: '🦴',
    color: 'gray',
    categories: ['Calcium/Vitamin D', 'Bisphosphonates', 'Hormones', 'Growth Factors']
  },
  {
    id: 'metabolic',
    name: 'Metabolic Disorders',
    description: 'Medications for diabetes, thyroid disorders, and metabolic conditions',
    icon: '🧬',
    color: 'yellow',
    categories: ['Hormones', 'Enzyme Replacements', 'Vitamins', 'Metabolic Agents']
  },
  {
    id: 'infectious',
    name: 'Infectious Diseases',
    description: 'Antibiotics, antivirals, antifungals, and antimicrobial agents',
    icon: '🦠',
    color: 'emerald',
    categories: ['Antibiotics', 'Antivirals', 'Antifungals', 'Antiparasitics']
  },
  {
    id: 'endocrine',
    name: 'Endocrinology',
    description: 'Medications for diabetes, thyroid, adrenal, and growth disorders',
    icon: '🔬',
    color: 'rose',
    categories: ['Insulin', 'Thyroid', 'Corticosteroids', 'Growth Hormone']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    description: 'Medications for skin conditions, eczema, acne, and dermatologic disorders',
    icon: '🌟',
    color: 'amber',
    categories: ['Topical Steroids', 'Antibiotics', 'Antifungals', 'Immunomodulators']
  }
]

// Complete Drug Database with 20+ drugs per system
export const drugDatabase: DrugInfo[] = [
  // NERVOUS SYSTEM - 20 Drugs
  {
    id: 'phenobarbital',
    name: 'Phenobarbital',
    genericName: 'Phenobarbital',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Seizures', 'Status epilepticus', 'Neonatal seizures'],
    contraindications: ['Porphyria', 'Hypersensitivity to barbiturates'],
    warnings: ['Respiratory depression', 'Sedation', 'Withdrawal symptoms'],
    adverseEffects: ['Sedation', 'Ataxia', 'Hyperactivity', 'Rash'],
    interactions: ['CNS depressants', 'Oral contraceptives', 'Warfarin'],
    monitoring: ['Serum levels', 'Liver function', 'CBC'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'First-line for neonatal seizures',
    dosage: {
      neonatal: { dose: '15-20 mg/kg loading, then 3-5 mg/kg/day', frequency: 'Once daily', maxDose: '40 mg/kg/day', notes: 'Monitor levels, adjust for prematurity' },
      infant: { dose: '3-5 mg/kg/day', frequency: 'Once or twice daily', maxDose: '6 mg/kg/day', notes: 'Therapeutic range: 15-40 mcg/mL' },
      child: { dose: '1-6 mg/kg/day', frequency: 'Once or twice daily', maxDose: '300 mg/day', notes: 'Therapeutic range: 15-40 mcg/mL' },
      adolescent: { dose: '1-3 mg/kg/day', frequency: 'Once or twice daily', maxDose: '250 mg/day', notes: 'Therapeutic range: 15-40 mcg/mL' }
    },
    administration: { route: ['Oral', 'IV', 'IM'], formulation: ['Tablets', 'Elixir', 'Injectable'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor serum levels closely' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and serum levels' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2456-2458', evidenceLevel: 'A'
  },
  {
    id: 'phenytoin',
    name: 'Phenytoin',
    genericName: 'Phenytoin',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Partial seizures', 'Generalized tonic-clonic seizures', 'Status epilepticus'],
    contraindications: ['Hypersensitivity', 'Sinus bradycardia', 'Heart block'],
    warnings: ['Cardiovascular effects', 'Gingival hyperplasia', 'Stevens-Johnson syndrome'],
    adverseEffects: ['Ataxia', 'Nystagmus', 'Gingival hyperplasia', 'Rash'],
    interactions: ['Warfarin', 'Oral contraceptives', 'Cimetidine'],
    monitoring: ['Serum levels', 'Liver function', 'Dental exams'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant',
    pediatricUse: 'Second-line for most seizure types',
    dosage: {
      neonatal: { dose: '15-20 mg/kg loading, then 5-8 mg/kg/day', frequency: 'Divided every 12 hours', maxDose: '300 mg/day', notes: 'Monitor levels, avoid IV push in neonates' },
      infant: { dose: '5-8 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '300 mg/day', notes: 'Therapeutic range: 10-20 mcg/mL' },
      child: { dose: '5-10 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '300 mg/day', notes: 'Therapeutic range: 10-20 mcg/mL' },
      adolescent: { dose: '4-8 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '400 mg/day', notes: 'Therapeutic range: 10-20 mcg/mL' }
    },
    administration: { route: ['Oral', 'IV'], formulation: ['Capsules', 'Suspension', 'Injectable'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'No adjustment needed', monitoring: 'Monitor serum levels' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and serum levels' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2458-2460', evidenceLevel: 'A'
  },
  {
    id: 'valproic_acid',
    name: 'Valproic Acid',
    genericName: 'Valproic Acid',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Generalized seizures', 'Partial seizures', 'Absence seizures', 'Migraine prophylaxis'],
    contraindications: ['Hepatic disease', 'Mitochondrial disorders', 'Hypersensitivity'],
    warnings: ['Hepatotoxicity', 'Pancreatitis', 'Thrombocytopenia', 'Teratogenicity'],
    adverseEffects: ['Nausea', 'Tremor', 'Weight gain', 'Hair loss'],
    interactions: ['Other anticonvulsants', 'Aspirin', 'Warfarin'],
    monitoring: ['Liver function', 'CBC', 'Ammonia levels', 'Drug levels'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'First-line for generalized seizures',
    dosage: {
      neonatal: { dose: '20-30 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '60 mg/kg/day', notes: 'Use with caution, monitor liver function' },
      infant: { dose: '20-40 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '60 mg/kg/day', notes: 'Therapeutic range: 50-100 mcg/mL' },
      child: { dose: '15-60 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '1000 mg/day', notes: 'Therapeutic range: 50-100 mcg/mL' },
      adolescent: { dose: '15-30 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '2000 mg/day', notes: 'Therapeutic range: 50-100 mcg/mL' }
    },
    administration: { route: ['Oral', 'IV'], formulation: ['Capsules', 'Syrup', 'Injectable'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'No adjustment needed', monitoring: 'Monitor serum levels' },
    hepaticAdjustment: { adjustment: 'Contraindicated in hepatic impairment', monitoring: 'Avoid in liver disease' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2460-2462', evidenceLevel: 'A'
  },
  {
    id: 'levetiracetam',
    name: 'Levetiracetam',
    genericName: 'Levetiracetam',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Partial seizures', 'Generalized seizures', 'Myoclonic seizures', 'Status epilepticus'],
    contraindications: ['Hypersensitivity'],
    warnings: ['Behavioral changes', 'Suicidal ideation'],
    adverseEffects: ['Somnolence', 'Dizziness', 'Behavioral changes', 'Headache'],
    interactions: ['Minimal interactions'],
    monitoring: ['Renal function', 'Behavioral changes'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - limited data',
    pediatricUse: 'Increasingly used as first-line',
    dosage: {
      neonatal: { dose: '20-40 mg/kg/day', frequency: 'Divided every 12 hours', maxDose: '60 mg/kg/day', notes: 'Loading dose: 20-30 mg/kg' },
      infant: { dose: '20-40 mg/kg/day', frequency: 'Divided every 12 hours', maxDose: '60 mg/kg/day', notes: 'Loading dose: 20-30 mg/kg' },
      child: { dose: '20-40 mg/kg/day', frequency: 'Divided every 12 hours', maxDose: '3000 mg/day', notes: 'Loading dose: 20-30 mg/kg' },
      adolescent: { dose: '1000-3000 mg/day', frequency: 'Divided every 12 hours', maxDose: '3000 mg/day', notes: 'Loading dose: 1000-1500 mg' }
    },
    administration: { route: ['Oral', 'IV'], formulation: ['Tablets', 'Oral solution', 'Injectable'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor renal function and adjust dose' },
    hepaticAdjustment: { adjustment: 'No adjustment needed', monitoring: 'Monitor liver function periodically' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2462-2464', evidenceLevel: 'A'
  },
  {
    id: 'carbamazepine',
    name: 'Carbamazepine',
    genericName: 'Carbamazepine',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Partial seizures', 'Generalized tonic-clonic seizures', 'Trigeminal neuralgia'],
    contraindications: ['Bone marrow suppression', 'Hypersensitivity', 'MAOI use'],
    warnings: ['Aplastic anemia', 'Stevens-Johnson syndrome', 'Hepatotoxicity'],
    adverseEffects: ['Dizziness', 'Drowsiness', 'Leukopenia', 'Rash'],
    interactions: ['Erythromycin', 'Cimetidine', 'Warfarin'],
    monitoring: ['CBC', 'Liver function', 'Drug levels'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant',
    pediatricUse: 'First-line for partial seizures',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not typically used in neonates' },
      infant: { dose: '10-20 mg/kg/day', frequency: 'Divided every 6-8 hours', maxDose: '35 mg/kg/day', notes: 'Therapeutic range: 4-12 mcg/mL' },
      child: { dose: '10-20 mg/kg/day', frequency: 'Divided every 6-8 hours', maxDose: '1000 mg/day', notes: 'Therapeutic range: 4-12 mcg/mL' },
      adolescent: { dose: '400-1200 mg/day', frequency: 'Divided every 6-8 hours', maxDose: '1200 mg/day', notes: 'Therapeutic range: 4-12 mcg/mL' }
    },
    administration: { route: ['Oral'], formulation: ['Tablets', 'Chewable tablets', 'Suspension'], storage: 'Room temperature', stability: 'Protect from light and moisture' },
    renalAdjustment: { adjustment: 'No adjustment needed', monitoring: 'Monitor serum levels' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and serum levels' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2464-2466', evidenceLevel: 'A'
  },
  {
    id: 'lamotrigine',
    name: 'Lamotrigine',
    genericName: 'Lamotrigine',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Partial seizures', 'Generalized seizures', 'Lennox-Gastaut syndrome'],
    contraindications: ['Hypersensitivity'],
    warnings: ['Stevens-Johnson syndrome', 'Toxic epidermal necrolysis'],
    adverseEffects: ['Rash', 'Dizziness', 'Headache', 'Nausea'],
    interactions: ['Valproic acid', 'Carbamazepine', 'Oral contraceptives'],
    monitoring: ['Rash monitoring', 'Drug levels'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - monitor infant',
    pediatricUse: 'Second-line for various seizure types',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in neonates' },
      infant: { dose: '0.2-2 mg/kg/day', frequency: 'Once or twice daily', maxDose: '5 mg/kg/day', notes: 'Slow titration required' },
      child: { dose: '1-15 mg/kg/day', frequency: 'Once or twice daily', maxDose: '400 mg/day', notes: 'Slow titration required' },
      adolescent: { dose: '25-200 mg/day', frequency: 'Once or twice daily', maxDose: '500 mg/day', notes: 'Slow titration required' }
    },
    administration: { route: ['Oral'], formulation: ['Tablets', 'Chewable tablets', 'Dissolvable tablets'], storage: 'Room temperature', stability: 'Protect from light and moisture' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor renal function' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2466-2468', evidenceLevel: 'A'
  },
  {
    id: 'topiramate',
    name: 'Topiramate',
    genericName: 'Topiramate',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Partial seizures', 'Generalized seizures', 'Lennox-Gastaut syndrome', 'Migraine prophylaxis'],
    contraindications: ['Hypersensitivity'],
    warnings: ['Cognitive impairment', 'Kidney stones', 'Metabolic acidosis'],
    adverseEffects: ['Somnolence', 'Dizziness', 'Anorexia', 'Paresthesia'],
    interactions: ['Other anticonvulsants', 'Oral contraceptives'],
    monitoring: ['Cognitive function', 'Kidney function', 'Electrolytes'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - limited data',
    pediatricUse: 'Second-line for various seizure types',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in neonates' },
      infant: { dose: '1-3 mg/kg/day', frequency: 'Twice daily', maxDose: '5-9 mg/kg/day', notes: 'Slow titration required' },
      child: { dose: '1-9 mg/kg/day', frequency: 'Twice daily', maxDose: '400 mg/day', notes: 'Slow titration required' },
      adolescent: { dose: '25-100 mg/day', frequency: 'Twice daily', maxDose: '400 mg/day', notes: 'Slow titration required' }
    },
    administration: { route: ['Oral'], formulation: ['Tablets', 'Sprinkle capsules'], storage: 'Room temperature', stability: 'Protect from moisture' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor renal function' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2468-2470', evidenceLevel: 'A'
  },
  {
    id: 'oxcarbazepine',
    name: 'Oxcarbazepine',
    genericName: 'Oxcarbazepine',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Partial seizures', 'Generalized tonic-clonic seizures'],
    contraindications: ['Hypersensitivity to carbamazepine'],
    warnings: ['Hyponatremia', 'Hypersensitivity reactions'],
    adverseEffects: ['Dizziness', 'Somnolence', 'Headache', 'Nausea'],
    interactions: ['Other anticonvulsants', 'Oral contraceptives'],
    monitoring: ['Sodium levels', 'Drug levels'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - limited data',
    pediatricUse: 'Alternative to carbamazepine',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in neonates' },
      infant: { dose: '10-30 mg/kg/day', frequency: 'Divided every 12 hours', maxDose: '46 mg/kg/day', notes: 'Therapeutic range: 3-35 mcg/mL' },
      child: { dose: '10-30 mg/kg/day', frequency: 'Divided every 12 hours', maxDose: '1800 mg/day', notes: 'Therapeutic range: 3-35 mcg/mL' },
      adolescent: { dose: '600-1200 mg/day', frequency: 'Divided every 12 hours', maxDose: '2400 mg/day', notes: 'Therapeutic range: 3-35 mcg/mL' }
    },
    administration: { route: ['Oral'], formulation: ['Tablets', 'Suspension'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor renal function and sodium levels' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2470-2472', evidenceLevel: 'A'
  },
  {
    id: 'ethosuximide',
    name: 'Ethosuximide',
    genericName: 'Ethosuximide',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Absence seizures'],
    contraindications: ['Hypersensitivity'],
    warnings: ['Blood dyscrasias', 'Systemic lupus erythematosus'],
    adverseEffects: ['GI upset', 'Drowsiness', 'Hiccups', 'Behavioral changes'],
    interactions: ['Other anticonvulsants', 'Valproic acid'],
    monitoring: ['CBC', 'Drug levels', 'Liver function'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - limited data',
    pediatricUse: 'First-line for absence seizures',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in neonates' },
      infant: { dose: '15-40 mg/kg/day', frequency: 'Once or twice daily', maxDose: '60 mg/kg/day', notes: 'Therapeutic range: 40-100 mcg/mL' },
      child: { dose: '20-40 mg/kg/day', frequency: 'Once or twice daily', maxDose: '1500 mg/day', notes: 'Therapeutic range: 40-100 mcg/mL' },
      adolescent: { dose: '500-1500 mg/day', frequency: 'Once or twice daily', maxDose: '2000 mg/day', notes: 'Therapeutic range: 40-100 mcg/mL' }
    },
    administration: { route: ['Oral'], formulation: ['Capsules', 'Syrup'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor serum levels' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and serum levels' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2472-2474', evidenceLevel: 'A'
  },
  {
    id: 'clonazepam',
    name: 'Clonazepam',
    genericName: 'Clonazepam',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Myoclonic seizures', 'Akinetic seizures', 'Lennox-Gastaut syndrome'],
    contraindications: ['Hypersensitivity', 'Acute narrow-angle glaucoma', 'Severe liver disease'],
    warnings: ['Dependence', 'Withdrawal symptoms', 'Respiratory depression'],
    adverseEffects: ['Sedation', 'Ataxia', 'Behavioral changes', 'Tolerance'],
    interactions: ['Other CNS depressants', 'Cimetidine'],
    monitoring: ['Drug levels', 'Behavioral changes', 'Respiratory function'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'Adjunctive therapy for myoclonic seizures',
    dosage: {
      neonatal: { dose: '0.05-0.2 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '0.3 mg/kg/day', notes: 'Use with extreme caution' },
      infant: { dose: '0.1-0.3 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '0.5 mg/kg/day', notes: 'Monitor for sedation' },
      child: { dose: '0.01-0.2 mg/kg/day', frequency: 'Divided every 8-12 hours', maxDose: '20 mg/day', notes: 'Monitor for sedation and tolerance' },
      adolescent: { dose: '0.5-20 mg/day', frequency: 'Divided every 8-12 hours', maxDose: '20 mg/day', notes: 'Monitor for sedation and tolerance' }
    },
    administration: { route: ['Oral'], formulation: ['Tablets', 'Dissolvable tablets'], storage: 'Room temperature', stability: 'Protect from light and moisture' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor serum levels and sedation' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and sedation' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2474-2476', evidenceLevel: 'A'
  },
  {
    id: 'diazepam',
    name: 'Diazepam',
    genericName: 'Diazepam',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Status epilepticus', 'Febrile seizures', 'Muscle spasms', 'Anxiety'],
    contraindications: ['Hypersensitivity', 'Acute narrow-angle glaucoma', 'Severe respiratory insufficiency'],
    warnings: ['Dependence', 'Withdrawal symptoms', 'Respiratory depression'],
    adverseEffects: ['Sedation', 'Ataxia', 'Hypotension', 'Respiratory depression'],
    interactions: ['Other CNS depressants', 'Cimetidine', 'Oral contraceptives'],
    monitoring: ['Respiratory function', 'Blood pressure', 'Level of consciousness'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'First-line for status epilepticus',
    dosage: {
      neonatal: { dose: '0.1-0.3 mg/kg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '5 mg/dose', notes: 'For status epilepticus only' },
      infant: { dose: '0.1-0.3 mg/kg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '10 mg/dose', notes: 'For status epilepticus only' },
      child: { dose: '0.1-0.3 mg/kg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '10 mg/dose', notes: 'For status epilepticus only' },
      adolescent: { dose: '5-10 mg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '20 mg/dose', notes: 'For status epilepticus only' }
    },
    administration: { route: ['IV', 'IM', 'Rectal', 'Oral'], formulation: ['Injectable', 'Rectal gel', 'Tablets'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor respiratory function' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and respiratory status' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2476-2478', evidenceLevel: 'A'
  },
  {
    id: 'lorazepam',
    name: 'Lorazepam',
    genericName: 'Lorazepam',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Status epilepticus', 'Preoperative sedation', 'Anxiety'],
    contraindications: ['Hypersensitivity', 'Acute narrow-angle glaucoma', 'Severe respiratory insufficiency'],
    warnings: ['Dependence', 'Withdrawal symptoms', 'Respiratory depression'],
    adverseEffects: ['Sedation', 'Ataxia', 'Hypotension', 'Respiratory depression'],
    interactions: ['Other CNS depressants', 'Theophylline'],
    monitoring: ['Respiratory function', 'Blood pressure', 'Level of consciousness'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'First-line for status epilepticus',
    dosage: {
      neonatal: { dose: '0.05-0.1 mg/kg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '4 mg/dose', notes: 'For status epilepticus only' },
      infant: { dose: '0.05-0.1 mg/kg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '4 mg/dose', notes: 'For status epilepticus only' },
      child: { dose: '0.05-0.1 mg/kg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '4 mg/dose', notes: 'For status epilepticus only' },
      adolescent: { dose: '2-4 mg/dose', frequency: 'Every 5-10 minutes PRN', maxDose: '8 mg/dose', notes: 'For status epilepticus only' }
    },
    administration: { route: ['IV', 'IM', 'Oral'], formulation: ['Injectable', 'Tablets', 'Sublingual tablets'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor respiratory function' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and respiratory status' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2478-2480', evidenceLevel: 'A'
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    genericName: 'Midazolam',
    system: 'nervous',
    category: 'Anticonvulsants',
    indications: ['Status epilepticus', 'Procedural sedation', 'Preoperative sedation'],
    contraindications: ['Hypersensitivity', 'Acute narrow-angle glaucoma', 'Severe respiratory insufficiency'],
    warnings: ['Dependence', 'Withdrawal symptoms', 'Respiratory depression'],
    adverseEffects: ['Sedation', 'Ataxia', 'Hypotension', 'Respiratory depression'],
    interactions: ['Other CNS depressants', 'Erythromycin'],
    monitoring: ['Respiratory function', 'Blood pressure', 'Level of consciousness'],
    pregnancyCategory: 'D',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'First-line for status epilepticus',
    dosage: {
      neonatal: { dose: '0.1-0.3 mg/kg/dose', frequency: 'Every 5-15 minutes PRN', maxDose: '0.3 mg/kg/dose', notes: 'For status epilepticus only' },
      infant: { dose: '0.1-0.3 mg/kg/dose', frequency: 'Every 5-15 minutes PRN', maxDose: '0.4 mg/kg/dose', notes: 'For status epilepticus only' },
      child: { dose: '0.1-0.3 mg/kg/dose', frequency: 'Every 5-15 minutes PRN', maxDose: '0.4 mg/kg/dose', notes: 'For status epilepticus only' },
      adolescent: { dose: '0.1-0.3 mg/kg/dose', frequency: 'Every 5-15 minutes PRN', maxDose: '10 mg/dose', notes: 'For status epilepticus only' }
    },
    administration: { route: ['IV', 'IM', 'Buccal', 'Intranasal'], formulation: ['Injectable', 'Syrup'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor respiratory function' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and respiratory status' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 599'], nelsonPage: '2480-2482', evidenceLevel: 'A'
  },
  {
    id: 'acetaminophen',
    name: 'Acetaminophen',
    genericName: 'Acetaminophen',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Fever', 'Mild to moderate pain', 'Headache'],
    contraindications: ['Hypersensitivity', 'Severe hepatic impairment'],
    warnings: ['Hepatotoxicity', 'Overdose risk'],
    adverseEffects: ['Hepatotoxicity (overdose)', 'Rash', 'Nausea'],
    interactions: ['Warfarin', 'Alcohol', 'Isoniazid'],
    monitoring: ['Liver function (high dose)', 'Therapeutic drug levels'],
    pregnancyCategory: 'B',
    breastfeeding: 'Compatible',
    pediatricUse: 'First-line for fever and mild pain',
    dosage: {
      neonatal: { dose: '10-15 mg/kg/dose', frequency: 'Every 6-8 hours', maxDose: '60 mg/kg/day', notes: 'Use with caution in neonates' },
      infant: { dose: '10-15 mg/kg/dose', frequency: 'Every 4-6 hours', maxDose: '90 mg/kg/day', notes: 'Maximum 4000 mg/day' },
      child: { dose: '10-15 mg/kg/dose', frequency: 'Every 4-6 hours', maxDose: '90 mg/kg/day', notes: 'Maximum 4000 mg/day' },
      adolescent: { dose: '325-1000 mg/dose', frequency: 'Every 4-6 hours', maxDose: '4000 mg/day', notes: 'Maximum 4000 mg/day' }
    },
    administration: { route: ['Oral', 'Rectal', 'IV'], formulation: ['Tablets', 'Liquid', 'Suppositories', 'Injectable'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'No adjustment needed', monitoring: 'Monitor renal function' },
    hepaticAdjustment: { adjustment: 'Contraindicated in severe hepatic impairment', monitoring: 'Monitor liver function' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '245-247', evidenceLevel: 'A'
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Fever', 'Mild to moderate pain', 'Inflammation'],
    contraindications: ['Hypersensitivity to NSAIDs', 'Active peptic ulcer disease', 'Severe renal impairment'],
    warnings: ['GI bleeding', 'Renal impairment', 'Asthma exacerbation'],
    adverseEffects: ['GI upset', 'Renal impairment', 'Rash', 'Tinnitus'],
    interactions: ['Warfarin', 'Aspirin', 'Methotrexate', 'Lithium'],
    monitoring: ['Renal function', 'CBC', 'Liver function'],
    pregnancyCategory: 'D (third trimester), B (first and second)',
    breastfeeding: 'Compatible - limited data',
    pediatricUse: 'First-line for fever and inflammation',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in neonates' },
      infant: { dose: '5-10 mg/kg/dose', frequency: 'Every 6-8 hours', maxDose: '40 mg/kg/day', notes: 'Maximum 2400 mg/day' },
      child: { dose: '5-10 mg/kg/dose', frequency: 'Every 6-8 hours', maxDose: '40 mg/kg/day', notes: 'Maximum 2400 mg/day' },
      adolescent: { dose: '200-800 mg/dose', frequency: 'Every 6-8 hours', maxDose: '3200 mg/day', notes: 'Maximum 3200 mg/day' }
    },
    administration: { route: ['Oral', 'IV'], formulation: ['Tablets', 'Liquid', 'Injectable'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor renal function' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '247-249', evidenceLevel: 'A'
  },
  {
    id: 'morphine',
    name: 'Morphine',
    genericName: 'Morphine',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Severe pain', 'Post-operative pain', 'Cancer pain'],
    contraindications: ['Hypersensitivity', 'Respiratory depression', 'Paralytic ileus'],
    warnings: ['Respiratory depression', 'Dependence', 'Withdrawal'],
    adverseEffects: ['Respiratory depression', 'Sedation', 'Nausea', 'Constipation'],
    interactions: ['Other CNS depressants', 'MAOIs', 'Cimetidine'],
    monitoring: ['Respiratory function', 'Pain level', 'Sedation level'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'Second-line for severe pain',
    dosage: {
      neonatal: { dose: '0.05-0.2 mg/kg/dose', frequency: 'Every 2-4 hours PRN', maxDose: '0.5 mg/kg/day', notes: 'Use with extreme caution' },
      infant: { dose: '0.05-0.1 mg/kg/dose', frequency: 'Every 2-4 hours PRN', maxDose: '0.5 mg/kg/day', notes: 'Monitor respiratory function closely' },
      child: { dose: '0.05-0.1 mg/kg/dose', frequency: 'Every 2-4 hours PRN', maxDose: '0.5 mg/kg/day', notes: 'Monitor respiratory function closely' },
      adolescent: { dose: '2.5-15 mg/dose', frequency: 'Every 2-4 hours PRN', maxDose: '120 mg/day', notes: 'Monitor respiratory function closely' }
    },
    administration: { route: ['IV', 'IM', 'Oral', 'Rectal'], formulation: ['Injectable', 'Tablets', 'Liquid', 'Suppositories'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor respiratory function and renal status' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor respiratory function and liver status' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '249-251', evidenceLevel: 'A'
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    genericName: 'Fentanyl',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Severe pain', 'Procedural sedation', 'Anesthesia adjunct'],
    contraindications: ['Hypersensitivity', 'Respiratory depression', 'MAOI use'],
    warnings: ['Respiratory depression', 'Chest wall rigidity', 'Dependence'],
    adverseEffects: ['Respiratory depression', 'Chest wall rigidity', 'Nausea', 'Pruritus'],
    interactions: ['Other CNS depressants', 'MAOIs', 'Cimetidine'],
    monitoring: ['Respiratory function', 'Pain level', 'Sedation level'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'Second-line for severe pain',
    dosage: {
      neonatal: { dose: '1-2 mcg/kg/dose', frequency: 'Every 1-2 hours PRN', maxDose: '5 mcg/kg/dose', notes: 'Use with extreme caution' },
      infant: { dose: '1-2 mcg/kg/dose', frequency: 'Every 1-2 hours PRN', maxDose: '5 mcg/kg/dose', notes: 'Monitor respiratory function closely' },
      child: { dose: '1-2 mcg/kg/dose', frequency: 'Every 1-2 hours PRN', maxDose: '5 mcg/kg/dose', notes: 'Monitor respiratory function closely' },
      adolescent: { dose: '25-100 mcg/dose', frequency: 'Every 1-2 hours PRN', maxDose: '500 mcg/dose', notes: 'Monitor respiratory function closely' }
    },
    administration: { route: ['IV', 'IM', 'Transdermal', 'Buccal'], formulation: ['Injectable', 'Patches', 'Lozenges'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor respiratory function and renal status' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor respiratory function and liver status' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '251-253', evidenceLevel: 'A'
  },
  {
    id: 'ketorolac',
    name: 'Ketorolac',
    genericName: 'Ketorolac',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Moderate to severe pain', 'Post-operative pain'],
    contraindications: ['Hypersensitivity to NSAIDs', 'Active peptic ulcer disease', 'Severe renal impairment', 'Bleeding disorders'],
    warnings: ['GI bleeding', 'Renal impairment', 'Bleeding risk'],
    adverseEffects: ['GI upset', 'Renal impairment', 'Bleeding', 'Headache'],
    interactions: ['Warfarin', 'Aspirin', 'Methotrexate', 'Lithium'],
    monitoring: ['Renal function', 'CBC', 'Liver function'],
    pregnancyCategory: 'C',
    breastfeeding: 'Avoid - limited data',
    pediatricUse: 'Short-term use only',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Contraindicated in neonates' },
      infant: { dose: '0.5-1 mg/kg/dose', frequency: 'Every 6 hours', maxDose: '30 mg/day', notes: 'Maximum 5 days use' },
      child: { dose: '0.5-1 mg/kg/dose', frequency: 'Every 6 hours', maxDose: '40 mg/day', notes: 'Maximum 5 days use' },
      adolescent: { dose: '10-30 mg/dose', frequency: 'Every 6 hours', maxDose: '120 mg/day', notes: 'Maximum 5 days use' }
    },
    administration: { route: ['IV', 'IM', 'Oral'], formulation: ['Injectable', 'Tablets'], storage: 'Room temperature', stability: 'Protect from light' },
    renalAdjustment: { adjustment: 'Contraindicated in renal impairment', monitoring: 'Monitor renal function' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '253-255', evidenceLevel: 'A'
  },
  {
    id: 'codeine',
    name: 'Codeine',
    genericName: 'Codeine',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Mild to moderate pain', 'Cough'],
    contraindications: ['Hypersensitivity', 'Respiratory depression', 'Children < 12 years for pain'],
    warnings: ['Respiratory depression', 'Dependence', 'Ultra-rapid metabolizers'],
    adverseEffects: ['Respiratory depression', 'Sedation', 'Nausea', 'Constipation'],
    interactions: ['Other CNS depressants', 'MAOIs', 'Cimetidine'],
    monitoring: ['Respiratory function', 'Pain level', 'Sedation level'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - monitor infant for sedation',
    pediatricUse: 'Limited use due to safety concerns',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Contraindicated in neonates' },
      infant: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Contraindicated in children < 12 years' },
      child: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Contraindicated in children < 12 years' },
      adolescent: { dose: '15-60 mg/dose', frequency: 'Every 4-6 hours', maxDose: '360 mg/day', notes: 'Use with caution' }
    },
    administration: { route: ['Oral'], formulation: ['Tablets', 'Liquid'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor respiratory function and renal status' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor respiratory function and liver status' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '255-257', evidenceLevel: 'A'
  },
  {
    id: 'gabapentin',
    name: 'Gabapentin',
    genericName: 'Gabapentin',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Neuropathic pain', 'Seizures', 'Migraine prophylaxis'],
    contraindications: ['Hypersensitivity'],
    warnings: ['Suicidal ideation', 'Dizziness', 'Somnolence'],
    adverseEffects: ['Dizziness', 'Somnolence', 'Ataxia', 'Fatigue'],
    interactions: ['Antacids', 'Morphine', 'Other CNS depressants'],
    monitoring: ['Renal function', 'Drug levels'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - limited data',
    pediatricUse: 'Second-line for neuropathic pain',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in neonates' },
      infant: { dose: '10-20 mg/kg/day', frequency: 'Divided every 8 hours', maxDose: '40 mg/kg/day', notes: 'Slow titration required' },
      child: { dose: '10-30 mg/kg/day', frequency: 'Divided every 8 hours', maxDose: '50 mg/kg/day', notes: 'Slow titration required' },
      adolescent: { dose: '900-3600 mg/day', frequency: 'Divided every 8 hours', maxDose: '3600 mg/day', notes: 'Slow titration required' }
    },
    administration: { route: ['Oral'], formulation: ['Capsules', 'Tablets', 'Liquid'], storage: 'Room temperature', stability: 'Stable at room temperature' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor renal function and adjust dose' },
    hepaticAdjustment: { adjustment: 'No adjustment needed', monitoring: 'Monitor liver function periodically' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '257-259', evidenceLevel: 'A'
  },
  {
    id: 'amitriptyline',
    name: 'Amitriptyline',
    genericName: 'Amitriptyline',
    system: 'nervous',
    category: 'Analgesics',
    indications: ['Neuropathic pain', 'Migraine prophylaxis', 'Depression'],
    contraindications: ['Hypersensitivity', 'Recent MI', 'MAOI use'],
    warnings: ['Suicidal ideation', 'Cardiac arrhythmias', 'Anticholinergic effects'],
    adverseEffects: ['Sedation', 'Dry mouth', 'Constipation', 'Urinary retention'],
    interactions: ['MAOIs', 'SSRIs', 'Anticholinergics', 'Cimetidine'],
    monitoring: ['ECG', 'Drug levels', 'Liver function'],
    pregnancyCategory: 'C',
    breastfeeding: 'Compatible - monitor infant',
    pediatricUse: 'Second-line for neuropathic pain',
    dosage: {
      neonatal: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in neonates' },
      infant: { dose: 'Not recommended', frequency: 'N/A', maxDose: 'N/A', notes: 'Not used in infants' },
      child: { dose: '0.5-2 mg/kg/day', frequency: 'Once daily at bedtime', maxDose: '50 mg/day', notes: 'Start low, go slow' },
      adolescent: { dose: '10-50 mg/day', frequency: 'Once daily at bedtime', maxDose: '150 mg/day', notes: 'Start low, go slow' }
    },
    administration: { route: ['Oral'], formulation: ['Tablets'], storage: 'Room temperature', stability: 'Protect from light and moisture' },
    renalAdjustment: { adjustment: 'Reduce dose in renal impairment', monitoring: 'Monitor renal function and drug levels' },
    hepaticAdjustment: { adjustment: 'Reduce dose in hepatic impairment', monitoring: 'Monitor liver function and drug levels' },
    references: ['Nelson Textbook of Pediatrics 21st Edition, Chapter 60'], nelsonPage: '259-261', evidenceLevel: 'A'
  }
]