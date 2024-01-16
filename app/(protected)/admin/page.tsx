
import RoleGate from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import AdminOnlyTest from "../_component/admin-only-tests";


function AdminPage() {

  return (
    <Card>
      <CardHeader>
        <h1 className="text-center w-full text-2xl font-bold">
          🔑 Admin
      </h1>
      </CardHeader>
      <CardContent>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this" />
          <AdminOnlyTest />
        </RoleGate>
      </CardContent>
    </Card>
  )
}

export default AdminPage