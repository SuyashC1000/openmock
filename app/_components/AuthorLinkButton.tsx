import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandTwitter,
  TbBrandYoutube,
  TbExternalLink,
  TbMail,
  TbPhone,
} from "react-icons/tb";
import { AuthorLinkType, TestPaperAuthor } from "../_interface/testData";
import { Button, Icon, Link } from "@chakra-ui/react";

const AuthorLinkButton = (props: TestPaperAuthor["links"][0]) => {
  return (
    <Link
      href={
        (props.type === AuthorLinkType.Email ? "mailto:" : "") +
        (props.type === AuthorLinkType.Phone ? "tel:+" : "") +
        props.url
      }
    >
      <Button
        size={"sm"}
        variant={"outline"}
        colorScheme="blue"
        className="flex gap-1 items-center"
        // leftIcon={<TbInfoHexagon />}
      >
        {props.type === AuthorLinkType.Email && (
          <Icon as={TbMail} boxSize={"20px"} />
        )}
        {props.type === AuthorLinkType.Phone && (
          <Icon as={TbPhone} boxSize={"20px"} />
        )}
        {props.type === AuthorLinkType.Youtube && (
          <Icon as={TbBrandYoutube} boxSize={"20px"} />
        )}
        {props.type === AuthorLinkType.Twitter && (
          <Icon as={TbBrandTwitter} boxSize={"20px"} />
        )}
        {props.type === AuthorLinkType.Github && (
          <Icon as={TbBrandGithub} boxSize={"20px"} />
        )}
        {props.type === AuthorLinkType.LinkedIn && (
          <Icon as={TbBrandLinkedin} boxSize={"20px"} />
        )}
        {props.label}
        {props.type === AuthorLinkType.Other ? (
          <Icon as={TbExternalLink} boxSize={"20px"} />
        ) : undefined}
      </Button>
    </Link>
  );
};

export default AuthorLinkButton;
