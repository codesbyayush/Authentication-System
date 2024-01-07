'use client'

import { newVerification } from '@/actions/new-verification';
import CardWrapper from '@/components/auth/card-wrapper'
import FormSuccess from '@/components/form-success';
import FormError from '@/components/form-error';
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader'


function NewVerification() {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    
    const searchParams = useSearchParams();

    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError("Missing Token");
            return;
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            }).catch(() => {
            setError("Something went wrong")
        })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

  return (
      <CardWrapper
          headerLabel='Email verified'
          backButtonHref='/auth/signin'
          backButtonLabel='Back to signIn'
          showSocial={false}
      >
          <div className='flex justify-center items-center w-full'>
              {!success && !error &&
                  <BeatLoader />
              }
              <FormSuccess message={success} />
              { !success && <FormError message={ error } />}
          </div>
    </CardWrapper>
  )
}

export default NewVerification