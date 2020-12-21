import PageLayout from 'src/components/layouts/PageLayout'
import PageTitle from 'src/components/PageTitle'
import RegisterForm from 'src/components/RegisterForm'
import { FlexContainerCenter } from '../login'

function RegisterPage() {
  return (
    <PageTitle title="Movie App - Register">
      <PageLayout>
        <FlexContainerCenter>
          <RegisterForm />
        </FlexContainerCenter>
      </PageLayout>
    </PageTitle>
  )
}

export default RegisterPage
