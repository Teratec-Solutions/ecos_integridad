import axios, { AxiosResponse } from "axios"
import { Template } from "../interfaces/Template"

const getTemplates = async (): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.get('api/templates/getTemplates')
        return response
    } catch (error) {
        return error
    }
}

const createTemplate = async (plantilla: Template): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/templates/createTemplate', plantilla)
        return response
    } catch (error) {
        return error
    }
}

const saveTemplate = async (plantilla: Template): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/templates/saveTemplate', plantilla)
        return response
    } catch (error) {
        return error
    }
}

const deleteTemplate = async (plantillaId: string): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/templates/deleteTemplate', {plantillaId:plantillaId})
        return response
    } catch (error) {
        return error
    }
}

const getTemplateByContract = async (idContract: string): Promise<AxiosResponse|any> => {
    try {
        const response : AxiosResponse = await axios.post('api/templates/getTemplateByContract', {idContract:idContract})
        return response
    } catch (error) {
        return error
    }
}

export default {
    getTemplates,
    createTemplate,
    saveTemplate,
    deleteTemplate,
    getTemplateByContract
}