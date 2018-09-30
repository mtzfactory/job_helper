export interface OffersInterface {
    offers: Array<OfferInterface>,
    totalResults: number,
    currentResults: number,
    totalPages: number,
    currentPage: number,
    pageSize: number,
    facets: Array<FacetInterface>
}

interface OfferInterface {
    id: string,
    title: string,
    category: PDInterface,
    subcategory: PDInterface,
    link: string,
    city: string,
    province: PDInterface,
    author: AuthorInterface,
    updated: string,
    published: string,
    applications: string,
    bold: boolean,
    urgent: boolean,
    salaryMin: PDInterface,
    salaryMax: PDInterface,
    salaryPeriod: PDInterface,
    contractType: PDInterface,
    workDay: PDInterface,
    study: PDInterface,
    experienceMin: PDInterface,
    requirementMin: string
}

interface FacetsInterface {
    key: string,
    name: string,
    facet: Array<FacetInterface>
}

interface FacetInterface {
    key: string,
    count: number,
    value: string
}

interface PDInterface {
    id: number,
    value: string
}

interface AuthorInterface {
    id: string,
    name: string,
    uri: string
}