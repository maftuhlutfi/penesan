import CustomHead from "../components/shared/CustomHead"
import Container from "../components/shared/Container"
import ContributeForm from "../components/Contribute/ContributeForm"
import Section from "../components/shared/Section";
import ContributeList from "../components/Contribute/ContributeList";
import useTranslations from "../hooks/useTranslations";

const ContributionPage = () => {
    const text = useTranslations('contributePage')

    return (
        <>
            <CustomHead
                title='Contribute Your Ideas - Penesan'
                description='Bagikan idemu dan tantang pengguna lain.'
                url='https://www.xn--slfd.id/contribute'
            />
            <Container>
                <Section style='max-w-screen-xl'>
                    <ContributeForm />
                </Section>
                <Section style='max-w-screen-xl'>
                    <p className='mb-2 font-semibold tracking-widest text-center text-cust-purple lg:text-lg'>{text[1][0]}</p>
                    <h1 className='text-2xl font-semibold text-center lg:text-3xl'>{text[1][1]}</h1>
                    <ContributeList />
                </Section>
            </Container>
        </>
    );
}

export default ContributionPage;