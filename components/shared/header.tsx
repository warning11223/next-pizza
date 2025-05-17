import {cn} from "@/lib/utils";
import {FC} from "react";
import {Container} from "@/components/shared/container";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui";
import {ArrowRight, ShoppingCart} from "lucide-react";
import {SearchInput} from "@/components/shared/search-input";

interface Props {
    className?: string;
}

export const Header: FC<Props> = ({className}) => {


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

                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>

                <Button className={cn('group relative', className)}>
                    <b>{0} ₽</b>
                    <span className="h-full w-[1px] bg-white/30 mx-3" />
                    <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                        <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
                        <b>{0}</b>
                    </div>
                    <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
                </Button>
            </Container>
        </header>
    );
};
