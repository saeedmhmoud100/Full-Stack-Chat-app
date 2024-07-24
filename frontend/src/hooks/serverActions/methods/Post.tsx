import customFetch from "@/hooks/serverActions/methods/customFeatch";


export default async function Post(url : string, data : any,withImage?: boolean) {
    return await customFetch(url, 'POST', data,withImage)
}