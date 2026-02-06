import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userServices } from './services/userServices'
import { adminRoutes } from './routes/adminRoutes';


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const data = await userServices.getSession()

    const adminRoute= adminRoutes


    const role = data?.user?.role
  
    if(!data){
        return NextResponse.redirect(new URL('/login',request.url))
    }

    if(role !== 'ADMIN' && adminRoute[0].items.some(item => path.startsWith(item.url))){
        return NextResponse.redirect(new URL('/',request.url))
    }

    if(role==='ADMIN' && path.startsWith('/dashboard')){
      return NextResponse.redirect(new URL('/manageUser',request.url))
    }
    if(role==='PROVIDER' && path.startsWith('/dashboard')){
      return NextResponse.redirect(new URL('/createCategory',request.url))
    }

    return NextResponse.next()
}
 


export const config = {
    matcher: ["/dashboard", "/dashboard/:path*","/manageUser","/manageUser/:path*"],
}