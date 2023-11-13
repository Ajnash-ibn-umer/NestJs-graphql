import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { BlogModule } from './modules/blog/blog.module';
import { BlogCategoryModule } from './modules/blog_category/blog_category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { GlobalGallaryModule } from './modules/global-gallary/global-gallary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: any) => {
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      },
      sortSchema: true,
      playground: false,

      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    BlogModule,
    BlogCategoryModule,
    GlobalGallaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
