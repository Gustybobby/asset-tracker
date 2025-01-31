import type {
  Config,
  ConfigKey,
} from "@/server/infrastructure/models/config.model";

export interface IConfigRepo {
  getConfig(key: ConfigKey): Promise<Config>;

  updateConfigValue(config: Config): Promise<Config>;
}
