import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    ChartColumn,
    Car,
    FolderOpen,
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
import type { NavItem } from '@/types';

type SidebarItem = NavItem & {
    permission?: string;
};

type AuthProps = {
    auth: {
        permissions: string[];
    };
};

const mainNavItems: SidebarItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: ChartColumn,
    },
    {
        title: 'Vehicles',
        href: vehicles(),
        icon: Car,
        permission: 'vehicles.view',
    },
    {
        title: 'Service Categories',
        href: serviceCategories(),
        icon: FolderOpen,
        permission: 'service_categories.manage',
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<AuthProps>().props;

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
