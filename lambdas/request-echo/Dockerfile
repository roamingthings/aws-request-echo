FROM public.ecr.aws/sam/build-nodejs14.x:latest as builder

ARG TMP_BUILD=/tmp

WORKDIR ${TMP_BUILD}
COPY ./ .

RUN npm ci
RUN npm run build

FROM public.ecr.aws/sam/build-nodejs14.x:latest

COPY --from=builder /tmp/build/ /dist/
