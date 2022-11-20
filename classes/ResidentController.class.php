<?php

class ResidentController extends ResidentModel {

    public function findResidentByID($id) {
        $this->getResidentById($id);
    }

    public function findResidentByName($name) {
        $this->getResidentsByName($name);
    }

    public function findResidentByEmail($email) {
        $this->getResidentByEmail($email);
    }

    public function findAllResidents() {
        $this->getAllResidents();
    }

    public function changeResidentRoom($newRoomNumber, $residentID){
        $this->changeRoom($newRoomNumber, $residentID);
    }

    public function removeResident($id){
        $this->deleteResident($id);
    }

    public function addNewResident($firstName, $lastName, $middleInitial, $residentID, $position, $DOB, $nationality, 
                                   $gender, $maritialStatus, $familyType, $homeAddress, $mailingAddress, 
                                   $emailAddress, $idNumber, $contactName, $contactRelationship, 
                                   $contactTelephone, $contactAddress, $contactEmail, $levelOfStudy, 
                                   $yearOfStudy, $programmeName, $facultyName, $nameOfSchool, 
                                   $roomNumber)
    {
        $this->addResident($firstName, $lastName, $middleInitial, $residentID, $position, $DOB, $nationality, 
        $gender, $maritialStatus, $familyType, $homeAddress, $mailingAddress, 
        $emailAddress, $idNumber, $contactName, $contactRelationship, 
        $contactTelephone, $contactAddress, $contactEmail, $levelOfStudy, 
        $yearOfStudy, $programmeName, $facultyName, $nameOfSchool, 
        $roomNumber);
    }
}