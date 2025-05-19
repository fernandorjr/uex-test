import { LocalStorageAdapter } from "@/adapters/local-storage";
import type { IUser } from "../user";
import type { IContact } from "./contact.interface";
import { ERepositoriesTokens } from "@/tokens/repositories";
import { RepositoryAdapter } from "@/adapters/repository";
import ContactService from "./contact.service";

const userStorage = new LocalStorageAdapter<IUser>(ERepositoriesTokens.USER);
const contactStorage = new LocalStorageAdapter<IContact>(ERepositoriesTokens.CONTACT);
const userRepository = new RepositoryAdapter<IUser>(userStorage);
const contactRepository = new RepositoryAdapter<IContact>(contactStorage);
const contactService = new ContactService(contactRepository, userRepository);

export { contactService };