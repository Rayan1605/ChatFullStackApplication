import {JoiRequestValidationError} from "@root/globels/error-handler";
import { Request} from "express";
import { ObjectSchema} from "joi"

type IJoiDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => void;


