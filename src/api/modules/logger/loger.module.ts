import { Module } from "@nestjs/common";
import { MyLogger } from "./loger.service";

@Module({
    providers: [MyLogger],
    exports: [MyLogger]
})
export class LoggerModule { }