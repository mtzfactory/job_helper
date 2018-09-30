export interface OfferInterface {
    id: string,
    title: string,
    category: DictionaryItem,
    subcategories: Array<DictionaryItem>,
    link: string,
    city: string,
    cityPD: DictionaryItem,
    province: DictionaryItem,
    zipCode: string,
    description: string,
    profile: Profile,
    creationDate: string,
    updateDate: string,
    applications: number,
    upsellings: Upselling,
    showPay: boolean,
    minPay: Pay,
    maxPay: Pay,
    contractType: DictionaryItem,
    journey: DictionaryItem,
    studiesMin: DictionaryItem,
    experienceMin: DictionaryItem,
    minRequirements: string,
    desiredRequirements: string,
    state: number,
    externalUrlForm: string,
    residence: DictionaryItem,
    country: DictionaryItem,
    exactLocation: boolean,
    latitude: number,
    longitude: number,
    department: string,
    vacancies: number,
    commissions: string,
    referenceId: string,
    contractDuration: string,
    detailedStudiesId: number,
    studying: boolean,
    schedule: string,
    jobLevel: DictionaryItem,
    staffInCharge: DictionaryItem,
    hasKillerQuestions: boolean,
    hasOpenQuestions: boolean,
    active: boolean,
    archived: boolean,
    deleted: boolean,
    availableForVisualization: boolean,
    disponibleForFullVisualization: boolean    
}

interface Profile {
    id: string,
    name: string,
    description: string,
    zipCode: string,
    city: string,
    province: any,
    web: string,
    numberWorkers: number,
    logoUrl: string,
    corporateWebsiteUrl: string,
    hidden: boolean
}

interface DictionaryItem {
    id: number,
    key: string,
    value: string,
    order: number,
    parent: number
}

interface Upselling {
    highlightColor: boolean,
    highlightUrgent: boolean,
    highlightHomeMonth: boolean,
    highlightHomeWeek: boolean,
    highlightSubcategory: boolean,
    highlightLogo: boolean,
    highlightStandingOffer: boolean
}

interface Pay {
    amount: number,
    amountId: number,
    amountValue: string,
    periodId: number,
    periodValue: string
} 