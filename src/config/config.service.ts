// ** Nest


import { IEnvSchema } from './validation.schema';
import { Injectable } from '@nestjs/common';

// ** Third Parties Import
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

// ** Types



@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvSchema;

  constructor() {
    dotenv.config();
    this.envConfig = this.validateEnvSchema(process.env);
  }

  private getEnvSchema() {
    const schema = Joi.object<IEnvSchema>({
      PORT: Joi.number().integer().positive().min(1001).max(9999).required(),
      MONGODB_URI: Joi.string().trim().min(1).required(),
      MONGODB_TEST_URI: Joi.string().trim().min(1).required(),
      NODE_ENV: Joi.string().trim().min(1).required(),
      // SALT_ROUNDS: Joi.number().min(1).required(),
      JWT_SECRET: Joi.string().trim().min(1).required(),
      JWT_EXPIRES_IN: Joi.string().trim().min(1).required(),
      JWT_REFRESH_SECRET: Joi.string().trim().min(1).required(),
      JWT_REFRESH_EXPIRES_IN: Joi.string().trim().min(1).required(),


      AWS_ACCESS_KEY_ID: Joi.string().trim().min(1).required(),
      AWS_SECRET_ACCESS_KEY: Joi.string().trim().min(1).required(),
      AWS_BUCKET: Joi.string().trim().min(1).required(),
      AWS_REGION: Joi.string().trim().min(1).required(),
      AWS_ACCESS_URL: Joi.string().trim().min(1).required(),
      // PINATA_SECRET_KEY: Joi.string().trim().min(1).required(),
      // PINATA_API_KEY: Joi.string().trim().min(1).required(),
      OTP_EXPIRY_TIME: Joi.number().integer().positive(),


      GOOGLE_CLIENT_ID: Joi.string().trim().min(1).required(),

      GOOGLE_CLIENT_SECRET: Joi.string().trim().min(1).required(),

      GCP_CREDENTIALS: Joi.string().trim().min(1),
    });

    return schema;
  }

  private validateEnvSchema(keyValuePairs) {
    const envSchema = this.getEnvSchema();
    const validateResult = envSchema.validate(keyValuePairs, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (validateResult.error) {
      throw new Error(
        `Validation failed for .env file. ${validateResult.error.message}`,
      );
    }

    return validateResult.value;
  }

  // get AES_PRIVATE_KEY(): string {
  //   return this.envConfig.AES_PRIVATE_KEY;
  // }

  get PORT(): number {
    return this.envConfig.PORT;
  }

  get MONGODB_URI(): string {
    return this.envConfig.MONGODB_URI;
  }
  get MONGODB_TEST_URI(): string {
    return this.envConfig.MONGODB_TEST_URI;
  }
  get REDIS_HOST(): string {
    return this.envConfig.REDIS_HOST;
  }
  get REDIS_PORT(): string {
    return this.envConfig.REDIS_PORT;
  }
  get REDIS_PASSWORD(): string {
    return this.envConfig.REDIS_PASSWORD;
  }
  get REDIS_DB(): string {
    return this.envConfig.REDIS_DB;
  }


  // get SALT_ROUNDS(): number {
  //   return this.envConfig.SALT_ROUNDS;
  // }

  get JWT_SECRET(): string {
    return this.envConfig.JWT_SECRET;
  }
  get JWT_EXPIRES_IN(): string {
    return this.envConfig.JWT_EXPIRES_IN;
  }
  get JWT_REFRESH_SECRET(): string {
    return this.envConfig.JWT_REFRESH_SECRET;
  }
  get JWT_REFRESH_EXPIRES_IN(): string {
    return this.envConfig.JWT_REFRESH_EXPIRES_IN;
  }
  get AWS_ACCESS_KEY_ID(): string {
    return this.envConfig.AWS_ACCESS_KEY_ID;
  }
  get AWS_SECRET_ACCESS_KEY(): string {
    return this.envConfig.AWS_SECRET_ACCESS_KEY;
  }
  get AWS_BUCKET(): string {
    return this.envConfig.AWS_BUCKET;
  }
  get AWS_REGION(): string {
    return this.envConfig.AWS_REGION;
  }
  get AWS_ACCESS_URL(): string {
    return this.envConfig.AWS_ACCESS_URL;
  }

  // get PINATA_API_KEY(): string {
  //   return this.envConfig.PINATA_API_KEY;
  // }


  get OTP_EXPIRY_TIME(): number {
    return this.envConfig.OTP_EXPIRY_TIME;
  }

  get STRIPE_SECRET_KEY(): string {
    return this.envConfig.STRIPE_SECRET_KEY;
  }
  get STRIPE_WEBHOOK_SECRET(): string {
    return this.envConfig.STRIPE_WEBHOOK_SECRET;
  }
  get STRIPE_PUBLISHABLE_KEY(): string {
    return this.envConfig.STRIPE_PUBLISHABLE_KEY;
  }

  // get WEBHOOK_SECRET(): string {
  //   return this.envConfig.WEBHOOK_SECRET;
  // }

  // get RPC_URL(): string {
  //   return this.envConfig.RPC_URL;
  // }

  // get CONTRACT_ADDRESS_ASSET(): string {
  //   return this.envConfig.CONTRACT_ADDRESS_ASSET;
  // }

  // get CONTRACT_ADDRESS_NFT(): string {
  //   return this.envConfig.CONTRACT_ADDRESS_NFT;
  // }

  // get CONTRACT_ADDRESS_TOKEN(): string {
  //   return this.envConfig.CONTRACT_ADDRESS_TOKEN;
  // }

  // get AI_URL(): string {
  //   return this.envConfig.AI_URL;
  // }
  // get AI_API_KEY(): string {
  //   return this.envConfig.AI_API_KEY;
  // }
  
  // // Azure Storage (keeping for backward compatibility)
  // get AzureConnection(): string {
  //   return this.envConfig.AzureConnection;
  // }
  // get ContainerClient(): string {
  //   return this.envConfig.ContainerClient;
  // }
  
  // GCP Storage
  // get GcpProjectId(): string {
  //   return this.envConfig.GCP_PROJECT_ID;
  // }

  // get GcpBucketName(): string {
  //   return this.envConfig.GCP_BUCKET_NAME;
  // }
  
  get GOOGLE_CLIENT_ID(): string {
    return this.envConfig.GOOGLE_CLIENT_ID;
  }
  // get AZURE_AD_CLIENT_ID(): string {
  //   return this.envConfig.AZURE_AD_CLIENT_ID;
  // }
  // get AZURE_AD_CLIENT_SECRET(): string {
  //   return this.envConfig.AZURE_AD_CLIENT_SECRET;
  // }
  // get AZURE_AD_TENANT_ID(): string {
  //   return this.envConfig.AZURE_AD_TENANT_ID;
  // }
  get GOOGLE_CLIENT_SECRET(): string {
    return this.envConfig.GOOGLE_CLIENT_SECRET;
  }
  // get APPLE_CLIENT_ID(): string {
  //   return this.envConfig.APPLE_CLIENT_ID;
  // }
  // get   APPLE_CLIENT_ID_Web(): string {
  //   return this.envConfig.APPLE_CLIENT_ID_Web;
  // }

  // get GOOGLE_CLIENT_ID_ANDROID(): string {
  //   return this.envConfig.GOOGLE_CLIENT_ID_ANDROID;
  // }
  // get GOOGLE_CLIENT_ID_IOS(): string {
  //   return this.envConfig.GOOGLE_CLIENT_ID_IOS;
  // }
  // get REFRESH_TOKEN_SECRET(): string {
  //   return this.envConfig.REFRESH_TOKEN_SECRET;
  // }

  // get REFRESH_Expires_IN(): string {
  //   return this.envConfig.REFRESH_Expires_IN;
  // }

}