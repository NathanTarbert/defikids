/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Box,
  Flex,
  GridItem,
  useDisclosure,
  Grid,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import shallow from "zustand/shallow";
import { useAuthStore } from "@/store/auth/authStore";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { InfoModal } from "@/components/modals/InfoModal";
import { ExpandedDashboardMenu } from "@/components/ExpandedDashboardMenu";
import { CollapsedDashboardMenu } from "@/components/CollapsedDashboardMenu";
import { useWindowSize } from "usehooks-ts";
import { EtherscanModal } from "@/components/modals/EtherscanModal";
import { RecentMemberActivity } from "@/components/dashboards/parentDashboard/RecentMemberActivity";
import FamilyStatistics from "@/components/dashboards/parentDashboard/FamilyStatistics";
import { DefiKidsHeading } from "@/components/DefiKidsHeading";
import { WithdrawDefiDollarsModal } from "@/components/modals/WithdrawDefiDollarsModal";
import { watchNetwork } from "@wagmi/core";
import { WrongNetwork } from "@/components/WrongNetwork";
import { validChainId } from "@/config";
import { useNetwork } from "wagmi";
import { DefiDollars } from "@/components/dashboards/parentDashboard/DefiDollars";
import { ethers } from "ethers";
import { TokenLockers } from "@/components/tokenLockers/TokenLockers";
import { useRouter } from "next/navigation";
import { Locker } from "@/data-schema/types";
import { formattedLocker } from "@/utils/formatLockers";
import TokenLockerContract from "@/blockchain/TokenLockers";
import DefiDollarsContract from "@/blockchain/DefiDollars";

const MemberDashboardClientLayout = ({
  memberAddress,
}: {
  memberAddress: string;
}) => {
  //=============================================================================
  //                               STATE
  //=============================================================================
  const [isValidChain, setIsValidChain] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [lockersByUser, setLockersByUser] = useState<Locker[]>([]);

  //=============================================================================
  //                               HOOKS
  //=============================================================================
  const { userDetails } = useAuthStore(
    (state) => ({
      userDetails: state.userDetails,
      familyMembers: state.familyMembers,
      setFamilyMembers: state.setFamilyMembers,
    }),
    shallow
  );

  useEffect(() => {
    const getLockers = async () => {
      //@ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);

      const TokenLockerInstance = await TokenLockerContract.fromProvider(
        provider
      );

      const defiDollarsInstance = await DefiDollarsContract.fromProvider();

      const lockersByUser = await TokenLockerInstance.fetchAllLockersByUser();

      const balance = await defiDollarsInstance.balanceOf(memberAddress);

      setLockersByUser(lockersByUser);
      setTokenBalance(balance);
    };
    getLockers();
  }, []);

  const { chain } = useNetwork();

  watchNetwork((network) => {
    if (validChainId === network.chain?.id) {
      setIsValidChain(true);
    }
  });

  const { width } = useWindowSize();
  4;
  const isMobileSize = width < 768;

  const { isOpen: isOpenExtendedMenu, onToggle: onToggleExtendedMenu } =
    useDisclosure();

  const { isOpen: isOpenCollapsedMenu, onToggle: onToggleCollapsedMenu } =
    useDisclosure();

  const {
    isOpen: isOpenEtherScan,
    onOpen: onOpenEtherScan,
    onClose: onCloseEtherScan,
  } = useDisclosure();

  const {
    isOpen: isOpenSettingsModal,
    onOpen: onOpenSettingsModal,
    onClose: onCloseSettingsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenInfoModal,
    onOpen: onOpenInfoModal,
    onClose: onCloseInfoModal,
  } = useDisclosure();

  const {
    isOpen: isOpenWithdrawDefiDollarsModal,
    onOpen: onOpenWithdrawDefiDollarsModal,
    onClose: onCloseWithdrawDefiDollarsModal,
  } = useDisclosure();

  useEffect(() => {
    const defiDollarsBalance = async () => {
      const defiDollarsInstance = await DefiDollarsContract.fromProvider();

      const balance = await defiDollarsInstance?.balanceOf(memberAddress);
      setTokenBalance(Number(ethers.formatEther(balance)));
    };

    defiDollarsBalance();
  }, [isOpenWithdrawDefiDollarsModal]);

  useEffect(() => {
    if (validChainId === chain?.id) {
      setIsValidChain(true);
    }
  }, []);

  if (!isValidChain || chain?.id !== validChainId) {
    return <WrongNetwork />;
  }

  return (
    <Box>
      <Flex
        direction={isMobileSize ? "column" : "row"}
        height="100%"
        bgPosition="center"
        bgSize="cover"
        bgImage={"/images/backgrounds/purple-bg.jpg"}
      >
        <Box zIndex={1}>
          <ExpandedDashboardMenu
            onToggleCollapsedMenu={onToggleCollapsedMenu}
            onToggleExtendedMenu={onToggleExtendedMenu}
            isOpenExtendedMenu={isOpenExtendedMenu}
            onOpenEtherScan={onOpenEtherScan}
            isMobileSize={isMobileSize}
            onOpenSettingsModal={onOpenSettingsModal}
            onOpenInfoModal={onOpenInfoModal}
            onOpenWithdrawDefiDollarsModal={onOpenWithdrawDefiDollarsModal}
            stableTokenBalance={tokenBalance}
          />
        </Box>
        {!isMobileSize && (
          <Box zIndex={100}>
            <CollapsedDashboardMenu
              onToggleCollapsedMenu={onToggleCollapsedMenu}
              onToggleExtendedMenu={onToggleExtendedMenu}
              isOpenCollapsedMenu={isOpenCollapsedMenu}
              isMobileSize={isMobileSize}
            />
          </Box>
        )}

        <Grid
          pt={isMobileSize ? "5rem" : "0"}
          pb={!isMobileSize ? "1.3rem" : "0"}
          w="100%"
          h="100%"
          templateColumns={isMobileSize ? "1fr" : "repeat(8, 1fr)"}
          templateRows={isMobileSize ? "auto" : "repeat(3, 1fr)"}
          gap={4}
          px={isMobileSize ? 0 : 5}
          bgPosition="center"
          bgSize="cover"
          bgImage={"/images/backgrounds/purple-bg.jpg"}
        >
          {!isMobileSize && (
            <GridItem
              rowStart={1}
              rowEnd={1}
              colStart={4}
              colEnd={9}
              h={isMobileSize ? "auto" : "105"}
              mt="1.2rem"
            >
              <DefiKidsHeading />
            </GridItem>
          )}

          <GridItem
            rowStart={1}
            rowEnd={isMobileSize ? 2 : 1}
            colStart={isMobileSize ? 1 : 1}
            colEnd={isMobileSize ? 1 : 9}
            h={isMobileSize ? "auto" : "105"}
            mt={isMobileSize ? "1.2rem" : "12rem"}
            mb="1.5rem"
          >
            <DefiDollars
              tokenBalance={tokenBalance}
              onOpenWithdrawDefiDollarsModal={onOpenWithdrawDefiDollarsModal}
            />
          </GridItem>

          <GridItem
            rowStart={
              isMobileSize || (isMobileSize && isOpenExtendedMenu) ? 2 : 0
            }
            rowEnd={isMobileSize ? 2 : 0}
            colSpan={isMobileSize ? 1 : 4}
            h={isMobileSize ? "auto" : "320"}
            bg="gray.900"
            borderRadius={isMobileSize ? "0" : "10px"}
          >
            <TokenLockers
              userDetails={userDetails}
              lockersByUser={lockersByUser}
            />
          </GridItem>

          <GridItem
            rowSpan={2}
            colStart={isMobileSize ? 1 : 5}
            colEnd={isMobileSize ? 1 : 9}
            h={isMobileSize ? "auto" : "100%"}
            bg="gray.900"
            borderRadius={isMobileSize ? "0" : "10px"}
          >
            <RecentMemberActivity
              memberAddress={memberAddress}
              onlyMemberActivity
            />
          </GridItem>

          <GridItem
            rowStart={isMobileSize ? 3 : 0}
            rowEnd={isMobileSize ? 3 : 0}
            colSpan={isMobileSize ? 1 : 4}
            bg="gray.900"
            borderRadius={isMobileSize ? "0" : "10px"}
          >
            <FamilyStatistics members={[]} />
          </GridItem>
        </Grid>
      </Flex>

      {/* Modals and other components */}

      <EtherscanModal isOpen={isOpenEtherScan} onClose={onCloseEtherScan} />

      <SettingsModal
        isOpen={isOpenSettingsModal}
        onClose={onCloseSettingsModal}
      />

      <InfoModal
        isOpen={isOpenInfoModal}
        onClose={onCloseInfoModal}
        isOpenExtendedMenu={isOpenExtendedMenu}
      />

      <WithdrawDefiDollarsModal
        isOpen={isOpenWithdrawDefiDollarsModal}
        onClose={onCloseWithdrawDefiDollarsModal}
      />
    </Box>
  );
};

export default MemberDashboardClientLayout;
