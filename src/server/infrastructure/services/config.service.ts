import type { IConfigRepo } from "@/server/interfaces/infrastructure/repos/config.repo.interface";
import type { IConfigService } from "@/server/interfaces/infrastructure/services/config.service.interface";
import type { Config, ConfigKey } from "../models/config.model";

export default class ConfigService implements IConfigService {
  constructor(private readonly configRepo: IConfigRepo) {}

  async getConfig(key: ConfigKey): Promise<Config> {
    return this.configRepo.getConfig(key);
  }

  async updateConfigValue(config: Config): Promise<Config> {
    return this.configRepo.updateConfigValue(config) as Promise<Config>;
  }
}
