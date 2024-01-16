import { currentUserRole } from '@/lib/current-user-role';
import { UserRole } from '@prisma/client';
import React from 'react'
import FormError from '../form-error';

type Props = {
    children: React.ReactNode;
    allowedRole: UserRole;
}

async function RoleGate({
    children,
    allowedRole
}: Props) {

    const role = await currentUserRole();
    if (role !== allowedRole) return (
        <FormError
            message='You do not have the permission to view this content!'
        />
    )
  return (
      <>
          {children}
      </>
  )
}

export default RoleGate;