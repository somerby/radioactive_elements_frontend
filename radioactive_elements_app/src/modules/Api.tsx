import mockElements from "./Mock"

export interface ElementInf {
    element_id: number,
    name: string,
    description: string,
    status: string,
    img_url: string,
    period_time_text: string,
    period_time: number,
    atomic_mass: number
}

export interface DecayInf {
    decay_elements_count: number,
    decay_id: number
}

export interface ElementsResponse {
    elements: ElementInf[],
    decay_information: DecayInf
}

export const getElementsWithSearch = async (atomic_mass = ''): Promise<ElementsResponse> =>{
    return fetch(`/api/elements?atomic_mass=${atomic_mass}`)
    .then((response) => response.json())
}

export const getElementWithId = async (element_id: number | string): Promise<ElementInf> => {
    return fetch(`/api/elements/${element_id}`)
    .then((response) => response.json())
};