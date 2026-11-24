import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    FolderGit2,
    ChartColumn,
    Car,
    FolderOpen,
    Wrench,
    Package,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as vehicles } from '@/routes/vehicles';
import { index as serviceCategories } from '@/routes/service_categories';
import { index as parts } from '@/routes/parts';
import type { NavItem } from '@/types';
import { index as services } from '@/routes/services';
import { useTranslation } from 'react-i18next';
import { index as appointments } from '@/routes/appointments';

type SidebarItem = NavItem & {
    permission?: string;
};

type AuthProps = {
    auth: {
        permissions: string[];
    };
};

export function AppSidebar() {
    const { auth } = usePage<AuthProps>().props;
    const { t } = useTranslation();

    const mainNavItems: SidebarItem[] = [
        {
            title: t('navigation.dashboard'),
            href: dashboard(),
            icon: ChartColumn,
        },
        {
            title: t('navigation.vehicles'),
            href: vehicles(),
            icon: Car,
            permission: 'vehicles.view',
        },
        {
            title: t('navigation.services'),
            href: services(),
            icon: Wrench,
            permission: 'services.update',
        },
        {
            title: t('navigation.service_categories'),
            href: serviceCategories(),
            icon: FolderOpen,
            permission: 'service_categories.manage',
        },
        {
            title: t('navigation.parts'),
            href: parts(),
            icon: Package,
            permission: 'parts.view',
        },
        {
            title: t('navigation.appointments'),
            href: appointments(),
            icon: Calendar,
            permission: 'appointments.view',
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: t('common.repository'),
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: t('common.documentation'),
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    const visibleNavItems = mainNavItems.filter(
        (item) =>
            !item.permission || auth.permissions.includes(item.permission),
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={visibleNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
