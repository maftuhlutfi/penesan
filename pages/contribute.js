import CustomHead from "../components/shared/CustomHead"
import Container from "../components/shared/Container"
import ContributeForm from "../components/Contribute/ContributeForm"
import Section from "../components/shared/Section";
import ContributeList from "../components/Contribute/ContributeList";

const ContributionPage = () => {
    return (
        <>
            <CustomHead
                title='Contribute Your Ideas - Penesan'
                description='Share your ideas and challenge the others.'
                url='https://debut.vercel.app/contribute'
            />
            <Container>
                <Section style='max-w-screen-xl'>
                    <ContributeForm />
                </Section>
                <Section style='max-w-screen-xl'>
                    <p className='text-cust-purple tracking-widest font-semibold mb-2 text-center lg:text-lg'>OTHERS IDEAS</p>
                    <h1 className='text-2xl font-semibold lg:text-3xl text-center'>Creative Ideas from Users</h1>
                    <ContributeList />
                </Section>
            </Container>
        </>
    );
}

export default ContributionPage;