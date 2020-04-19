import * as ServicesMod from '../../services';
import * as ModelsMod from '../../models';

export interface ContextDeps {
  services: {
    [K in keyof typeof ServicesMod]: typeof ServicesMod[K];
  };
  models: {
    [K in keyof typeof ModelsMod]: typeof ModelsMod[K];
  };
}
