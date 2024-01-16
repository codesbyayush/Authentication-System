"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTransition } from "react";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import SettingsForm from "../_component/settings-form";

function Profile() {


  return (
    <Card>
      <CardHeader>
        <h1 className="text-center w-full text-2xl font-bold">⚙️ Settings</h1>
      </CardHeader>
      <CardContent>
        <SettingsForm />
      </CardContent>
    </Card>
  );
}

export default Profile;
