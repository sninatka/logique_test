import { RoleEntity } from 'src/roles/infrastructure/persistence/relational/entities/role.entity';
import { User } from '../../../../domain/user';
import { UserEntity } from '../entities/user.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { StatusEntity } from 'src/statuses/infrastructure/persistence/relational/entities/status.entity';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User();
    user.id = raw.id;
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.provider = raw.provider;
    user.socialId = raw.socialId;
    user.name = raw.name;
    if (raw.photos) {
      user.photos = FileMapper.toDomain(raw.photos);
    }
    user.address = raw.address;
    user.creditcard_type = raw.creditcard_type;
    user.creditcard_number = raw.creditcard_number;
    user.creditcard_name = raw.creditcard_name;
    user.creditcard_expired = raw.creditcard_expired;
    user.creditcard_cvv = raw.creditcard_cvv;
    user.role = raw.role;
    user.status = raw.status;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.deletedAt = raw.deletedAt;
    return user;
  }

  static toPersistence(user: User): UserEntity {
    let role: RoleEntity | undefined = undefined;

    if (user.role) {
      role = new RoleEntity();
      role.id = user.role.id;
    }

    let photos: FileEntity | undefined | null = undefined;

    if (user.photos) {
      photos = new FileEntity();
      photos.id = user.photos.id;
      photos.path = user.photos.path;
    } else if (user.photos === null) {
      photos = null;
    }

    let status: StatusEntity | undefined = undefined;

    if (user.status) {
      status = new StatusEntity();
      status.id = user.status.id;
    }

    const userEntity = new UserEntity();
    if (user.id && typeof user.id === 'number') {
      userEntity.id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.previousPassword = user.previousPassword;
    userEntity.provider = user.provider;
    userEntity.socialId = user.socialId;
    userEntity.name = user.name;
    userEntity.photos = photos;
    userEntity.address = user.address;
    userEntity.creditcard_type = user.creditcard_type;
    userEntity.creditcard_number = user.creditcard_number;
    userEntity.creditcard_name = user.creditcard_name;
    userEntity.creditcard_expired = user.creditcard_expired;
    userEntity.creditcard_cvv = user.creditcard_cvv;
    userEntity.role = role;
    userEntity.status = status;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    return userEntity;
  }
}
