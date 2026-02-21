import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userServices } from './services/userServices'
import { adminRoutes } from './routes/adminRoutes';
import { customerRoutes } from './routes/customerRoutes';
import { providerRoutes } from './routes/providerRoutes';


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const data = await userServices.getSession()

    const adminRoute = adminRoutes
    const customerRoute = customerRoutes;
    const providerRoute = providerRoutes

    const roleRoute :Record<string,string>={
        ADMIN:'/admin-dashboard',
        CUSTOMER:'/dashboard/my-card',
        PROVIDER:'/provider-dashboard/manage-menu'
    }


    const role = data?.user?.role


    if (!data) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (role !== 'ADMIN' && adminRoute[0].items.some(item => path.startsWith(item.url))) {

        return NextResponse.redirect(new URL(roleRoute[role!], request.url))
    }
    if (role !== 'CUSTOMER' && customerRoute[0].items.some(item => path.startsWith(item.url))) {
        return NextResponse.redirect(new URL(roleRoute[role!], request.url))
    }
    if (role !== 'PROVIDER' && providerRoute[0].items.some(item => path.startsWith(item.url))) {
        return NextResponse.redirect(new URL(roleRoute[role!], request.url))
    }

    if (role === 'ADMIN' && path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url))
    }
    if (role === 'PROVIDER' && path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/provider-dashboard/add-menu', request.url))
    }

    return NextResponse.next()
}



export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*",
        "/provider-dashboard", "/provider-dashboard/:path*"],
}