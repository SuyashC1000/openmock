"use client";

import {
  createConfirmationCreater,
  createReactTreeMounter,
  createMountPoint,
  confirmable as baseConfirmable,
} from "react-confirm";

const mounter = createReactTreeMounter();

export const createConfirmation = createConfirmationCreater(mounter);
export const MountPoint = createMountPoint(mounter);
export const confirmable = baseConfirmable;
