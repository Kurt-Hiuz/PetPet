import '../../models/pet_account.dart';

abstract class PetAccountRepository {
  Future<PetAccount?> getPetAccountById(String id);
  Future<void> addPet(PetAccount newPetAccount);
}