import {useRouter} from "next/router";
import {MainLayout} from "../components/MainLayout";


const Index = () => {
    const router = useRouter()


    return (
        <MainLayout title={`Home`}>
            <h1>Home Page</h1>
        </MainLayout>
    )
}

export default Index