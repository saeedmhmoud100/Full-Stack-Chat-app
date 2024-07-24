import customFetch from "@/hooks/serverActions/methods/customFeatch";


export default async function Put(url : string, data : any,withImage?: boolean) {
    return await customFetch(url, 'PUT', data,withImage)
}