import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { UsersModule, BlogsModule, ProfileModule } from "../modules";

const routes = [
    {
        path: '/auth',
        module: UsersModule
    },
    {
        path: '/profile',
        module: ProfileModule
    },
    {
        path: '/blogs',
        module: BlogsModule
    }
]

@Module({
    imports: [
        RouterModule.register(routes)
    ]
})

export class AppRoutingModule { }