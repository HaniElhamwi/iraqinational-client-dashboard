import { ReactNode } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

const Index = () => {
    return (
        <>
            <div>
                <h1>starter page</h1>
            </div>
        </>
    );
};

export default Index;

Index.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
