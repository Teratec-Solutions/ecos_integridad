import { Template } from "@/interfaces/template.interface";
import templateModel from "@/models/template.model";

const getTemplates = async () => {
    try {
        const templateRes: Template[] = await templateModel.find().populate('contrato').populate('cliente')
        return templateRes
    } catch (error) {
        
    }
}

const createTemplate = async (template: Template) => {
    try {
        const templateRes: Template = await templateModel.create(template)
        return templateRes
    } catch (error) {
        
    }
}

const saveTemplate = async (template: Template) => {
    try {
        const templateRes: Template = await templateModel.findByIdAndUpdate(template._id, template)
        console.log(templateRes)
        return templateRes
    } catch (error) {
        
    }
}

const deleteTemplate = async (templateId: string) => {
    console.log(templateId)
    try {
        const templateRes: Template = await templateModel.findByIdAndDelete({_id:templateId})
        console.log(templateRes)
        return templateRes
    } catch (error) {
        
    }
}

const getTemplateByContract = async (idContract: {idContract: string}) => {
    console.log('INFO ============>>>>', idContract.idContract)
    try {
        const templateRes: any = await templateModel.find( {contrato : { $all : [idContract.idContract] }})
        console.log('**************', templateRes)
        return templateRes
    } catch (error) {
        
    }
}

export default {
    getTemplates,
    createTemplate,
    saveTemplate,
    deleteTemplate,
    getTemplateByContract
}