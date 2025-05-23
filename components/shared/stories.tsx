'use client';

import React from 'react';
import {X} from 'lucide-react';
import ReactStories from 'react-insta-stories';
import {Api} from '@/services/api-client';
import {Container} from "@/components/shared/container";
import {cn} from "@/lib/utils";
import {IStory} from "@/services/stories";
import {useScrollLock} from "@/hooks/useScrollLock";
import {useWindowSize} from "react-use";

interface Props {
    className?: string;
}

export const Stories: React.FC<Props> = ({className}) => {
    const [stories, setStories] = React.useState<IStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<IStory>();

    const { width: windowWidth, height: windowHeight } = useWindowSize();

    useScrollLock(open);

    React.useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }

        fetchStories();
    }, []);

    const storyDimensions = React.useMemo(() => {
        const maxWidth = Math.min(windowWidth - 32, 520);
        const maxHeight = windowHeight - 80;

        const aspectRatio = 9/16;

        let width = maxWidth;
        let height = width / aspectRatio;

        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }

        return { width, height };
    }, [windowWidth, windowHeight]);

    const onClickStory = (story: IStory) => {
        setSelectedStory(story);

        if (story.items.length > 0) {
            setOpen(true);
        }
    };

    return (
        <>
            <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
                {stories.length === 0 &&
                    [...Array(6)].map((_, index) => (
                        <div key={index} className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"/>
                    ))}

                {stories.map((story) => (
                    <img
                        key={story.id}
                        onClick={() => onClickStory(story)}
                        className="rounded-md cursor-pointer"
                        height={250}
                        width={200}
                        src={story.previewImageUrl}
                    />
                ))}

                {open && (
                    <div className="fixed inset-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
                        <div className="relative">
                            <button className="absolute -right-10 -top-5 z-30" onClick={() => setOpen(false)}>
                                <X className="absolute top-3 right-0 w-8 h-8 text-white/50"/>
                            </button>

                            <ReactStories
                                onAllStoriesEnd={() => setOpen(false)}
                                stories={selectedStory?.items.map((item) => ({url: item.sourceUrl})) || []}
                                defaultInterval={3000}
                                width={storyDimensions.width}
                                height={storyDimensions.height}
                            />
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};
