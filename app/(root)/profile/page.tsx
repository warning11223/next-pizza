import React from 'react';
import {ProfileForm} from "@/components/shared";
import prisma from "@/prisma/prisma-client";
import {redirect} from "next/navigation";
import {getUserSession} from "@/lib/get-user-session";

const ProfilePage = async () => {
    const session = await getUserSession();

    if (!session) {
        return redirect('/not-auth');
    }

    const user = await prisma.user.findFirst({ where: { id: Number(session?.id) } });

    return (
        <ProfileForm data={user!} />
    );
};

export default ProfilePage;