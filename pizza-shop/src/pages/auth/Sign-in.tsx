import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const signInForm = z.object({
    email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>()

    function handleSignIn(data: SignInForm) {
        toast.success('Enviamos um link de autenticação para o seu e-mail!', {
            action: {
                label: 'Reenviar',
                onClick: () => handleSignIn(data)
            }
        })
    }

    return (
        <>
            <Helmet title="Login" />
            <div className='p-8'>
                <Button variant="ghost" asChild className='absolute right-8 top-8'>
                    <Link to="/sign-up">
                        Novo estabelecimento
                    </Link>
                </Button>
                <div className='w-[350px] flex flex-col justify-center gap-6'>
                    <div className='flex flex-col gap-2 text-center'>
                        <h1 className='text-2xl font-semibold tracking-tight'>
                            Acessar Painel
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Acompanhe suas vendas
                        </p>
                    </div>

                    <form className='space-y-4' onSubmit={handleSubmit(handleSignIn)}>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Seu e-mail</Label>
                            <Input id='email' type='email' {...register('email')} />
                        </div>

                        <Button className='w-full' type='submit' disabled={isSubmitting}>
                            Acessar Painel
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}