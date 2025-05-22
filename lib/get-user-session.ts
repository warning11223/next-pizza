import { getServerSession } from 'next-auth';
import {authOptions} from "@/components/shared/constants";

export const getUserSession = async () => {
    const session = await getServerSession(authOptions);

    return session?.user ?? null;
};
