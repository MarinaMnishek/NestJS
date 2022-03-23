import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DecrementIdFromBody = createParamDecorator(
    (data: string[], ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        data.forEach(element => {
            const id = request.body[element];
            if (id) request.body[element] = id - 1
        });

        return data
    },
);
