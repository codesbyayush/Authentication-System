import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";

type Props = {
  user?: ExtendedUser;
  label: string;
};

function UserInfo({ user, label }: Props) {
  return (
    <Card>
      <CardHeader>
        <h1 className="text-center w-full text-2xl font-bold">{label}</h1>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between shadow-sm px-6 py-3 rounded-md">
          <p className="font-medium">Id </p>
          <p className="truncate text-sm">{user?.id}</p>
        </div>
        <div className="flex items-center justify-between shadow-sm px-6 py-3 rounded-md">
          <p className="font-medium">Email </p>
          <p className="truncate text-sm">{user?.email}</p>
        </div>
        <div className="flex items-center justify-between shadow-sm px-6 py-3 rounded-md">
          <p className="font-medium">Name:</p>
          <p className="truncate text-sm">{user?.name}</p>
        </div>
        <div className="flex items-center justify-between shadow-sm px-6 py-3 rounded-md">
          <p className="font-medium">Role:</p>
          <p className="truncate text-sm  capitalize">
            {user?.role?.toLowerCase()}
          </p>
              </div>
        <div className="flex items-center justify-between shadow-sm px-6 py-3 rounded-md">
                  <p className="font-medium">Two Factor Authentication:</p>
                  <Badge
                    variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
                  >
                  {user?.isTwoFactorEnabled ? "ON" : "OFF"}
              </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
