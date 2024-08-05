


export default function HomeLayout({children,publicChat}) {
    console.log(publicChat)


    return (
        <>
            {children}
            {publicChat}
        </>
    )
}