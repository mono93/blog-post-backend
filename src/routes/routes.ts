import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { UsersModule } from "src/modules/users/users.module";

const routes = [
    {
        path: '/user',
        module: UsersModule
    }
]

@Module ({
    imports: [
        RouterModule.register(routes)
    ]
})

export class AppRoutingModule {}