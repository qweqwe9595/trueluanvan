import StatusCard from "../StatusCard";
import SettingsForm from "../SettingsForm";
import ProfileCard from "../ProfileCard";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Textarea from "@material-tailwind/react/Textarea";
import { useState } from "react";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="bg-white pt-14 pb-28 px-3 md:px-8 h-auto">
        <div className="container mx-auto max-w-full">
          <div>Setting some constain</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
            <Button
              className="w-full bg-mainPurple p-2 text-white rounded cursor-pointer"
              color="purple"
              type="button"
              onClick={(e) => setShowModal(true)}
              ripple="light"
            >
              Bad Word
            </Button>

            <Modal
              size="regular"
              active={showModal}
              toggler={() => setShowModal(false)}
            >
              <ModalHeader toggler={() => setShowModal(false)}>
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Textarea
                  color="black"
                  size="regular"
                  outline={true}
                  placeholder="Template: badword,badword"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="red"
                  buttonType="link"
                  onClick={(e) => setShowModal(false)}
                  ripple="dark"
                >
                  Close
                </Button>

                <Button
                  color="green"
                  onClick={(e) => setShowModal(false)}
                  ripple="light"
                >
                  Save Changes
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
