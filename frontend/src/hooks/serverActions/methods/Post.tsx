import customFetch from "@/hooks/serverActions/methods/customFeatch";


export default async function Post(url : string, data : any) {
    return await customFetch(url, 'POST', data)
}