import { User } from '../../../../domain/user';
import { UserSchemaClass } from '../entities/user.schema';
import { FileSchemaClass } from 'src/files/infrastructure/persistence/document/entities/file.schema';
import { Status } from 'src/statuses/domain/status';
import { Role } from 'src/roles/domain/role';
import { FileMapper } from 'src/files/infrastructure/persistence/document/mappers/file.mapper';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const user = new User();
    user.id = raw._id.toString();
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.provider = raw.provider;
    user.socialId = raw.socialId;
    user.name = raw.name;
    if (raw.photos) {
      user.photos = FileMapper.toDomain(raw.photos);
    } else if (raw.photos === null) {
      user.photos = null;
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

  static toPersistence(user: User): UserSchemaClass {
    let role: Role | undefined = undefined;

    if (user.role) {
      role = new Role();
      role.id = user.role.id;
    }

    let photos: FileSchemaClass | undefined = undefined;

    if (user.photos) {
      photos = new FileSchemaClass();
      photos._id = user.photos.id;
      photos.path = user.photos.path;
    }

    let status: Status | undefined = undefined;

    if (user.status) {
      status = new Status();
      status.id = user.status.id;
    }

    const userEntity = new UserSchemaClass();
    if (user.id && typeof user.id === 'string') {
      userEntity._id = user.id;
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
