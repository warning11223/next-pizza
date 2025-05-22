'use client';

import {FC, useEffect, useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Container} from "@/components/shared/container";
import {SearchInput} from "@/components/shared/search-input";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {AuthModal} from "@/components/shared/modals/auth-modal/auth-modal";
import {ProfileButton} from "@/components/shared/profile-button";

interface Props {
    className?: string;
    hasCart?: boolean;
    hasSearch?: boolean;
}

export const Header: FC<Props> = ({className, hasSearch = true}) => {
    const [openAuthModal, setOpenAuthModal] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена!';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 500);
        }
    }, []);

    return (
        <header className={cn('border border-b border-gray-100', className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" width={35} height={35} alt="Logo" />
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <AuthModal
                        open={openAuthModal}
                        onClose={() => setOpenAuthModal(false)}
                    />

                    <ProfileButton
                        onClickOpenModal={() => setOpenAuthModal(true)}
                    />

                    {/*{hasCart && <CartButton />}*/}
                </div>
            </Container>
        </header>
    );
};
