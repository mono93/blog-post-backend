import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { UsersModule, BlogsModule } from "../modules";

const routes = [
    {
        path: '/user',
        module: UsersModule
    },
    {
        path: '/blogs',
        module: BlogsModule
    }
]

@Module ({
    imports: [
        RouterModule.register(routes)
    ]
})

export class AppRoutingModule {}