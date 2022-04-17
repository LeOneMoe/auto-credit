import {useRouter} from "next/router";
import {MainLayout} from "../components/Layouts/MainLayout";

const About = () => {
    const router = useRouter()

    const clickHandler = () => {
        router.push(`/`)
    }

    return (
        <MainLayout title={`About`}>
            <h1>About Page</h1>
            <button onClick={clickHandler}>Go back</button>
        </MainLayout>
    )
}

export default About
